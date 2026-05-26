from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import json
import werkzeug.utils
import hashlib
from dotenv import load_dotenv
import tempfile

# Set temporary directory to D: drive because C: drive is full
tmp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tmp")
os.makedirs(tmp_dir, exist_ok=True)
tempfile.tempdir = tmp_dir
os.environ["TMPDIR"] = tmp_dir
os.environ["TEMP"] = tmp_dir
os.environ["TMP"] = tmp_dir

load_dotenv()
from apk_analyzer import analyze_apk_pro
from mobsf_api import analyze_with_mobsf
from utils.logger import logger
from models import db, ScanResult, AnalysisJob
from secret_validator import run_live_validation
import concurrent.futures

executor = concurrent.futures.ThreadPoolExecutor(max_workers=2)

frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'frontend'))
app = Flask(__name__, static_folder=frontend_dir, static_url_path='/')

@app.route('/')
def serve_frontend():
    return app.send_static_file('index.html')

CORS(app)

app.secret_key = os.getenv("SECRET_KEY", "super_secret_apk_analyzer_key")

from compiler_api import compiler_bp
from auth_api import auth_bp

app.register_blueprint(compiler_bp)
app.register_blueprint(auth_bp)
# Database Setup
database_url = os.getenv("DATABASE_URL")
if database_url:
    # SQLAlchemy requires "postgresql://" prefix
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///apk_analyzer_v2.db'
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        "connect_args": {"timeout": 30}
    }

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 100))
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE_MB * 1024 * 1024  # Enforce upload limit

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# trigger reload 12

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'apk'

from flask import send_from_directory

@app.route('/')
def index():
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../frontend'), 'index.html')

@app.route('/report/<int:scan_id>')
def report_view(scan_id):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../frontend'), 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../frontend'), path)

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify backend is running."""
    return jsonify({"status": "running"}), 200

def process_apk_background(job_id, filepath, filename, is_temp_file, deep_dex, crash_prediction, strict_mode, app_type, user_id):
    with app.app_context():
        job = AnalysisJob.query.get(job_id)
        if not job:
            logger.error(f"Job {job_id} not found in DB.")
            return

        job.status = 'RUNNING'
        db.session.commit()

        try:
            mobsf_api_key = os.environ.get("MOBSF_API_KEY")
            
            if mobsf_api_key:
                logger.info("MOBSF_API_KEY detected. Routing to MobSF Engine...")
                result = analyze_with_mobsf(filepath, expected_type=app_type)
            else:
                logger.info("Using local Androguard Engine...")
                result = analyze_apk_pro(filepath, deep_dex=deep_dex, crash_prediction=crash_prediction, strict_mode=strict_mode, expected_type=app_type)
            
            # Run Dynamic Analysis
            try:
                from dynamic_analyzer import DynamicAnalyzer
                dyn_analyzer = DynamicAnalyzer()
                package_name = result.get("package")
                
                # Update progress for Dynamic Analysis phase
                job.progress = 60
                db.session.commit()
                
                if package_name and package_name != "Unknown":
                    logger.info(f"Starting Dynamic Analysis for {package_name}...")
                    dynamic_report = dyn_analyzer.analyze(filepath, package_name)
                    result["dynamic_analysis"] = dynamic_report
                else:
                    logger.warning("Skipping dynamic analysis: Package name unknown.")
                    result["dynamic_analysis"] = {"error": "Package name unknown"}
            except Exception as e:
                logger.error(f"Dynamic Analysis failed: {e}")
                result["dynamic_analysis"] = {"error": str(e)}
            
            file_hash = "unknown"
            try:
                if os.path.exists(filepath):
                    sha256_hash = hashlib.sha256()
                    with open(filepath, "rb") as f:
                        for byte_block in iter(lambda: f.read(4096), b""):
                            sha256_hash.update(byte_block)
                    file_hash = sha256_hash.hexdigest()
            except Exception as e:
                logger.error(f"Error calculating hash: {e}")

            new_scan = ScanResult(
                user_id=user_id,
                package_name=result.get("package", "Unknown"),
                app_name=result.get("app_name", "Unknown"),
                version_name=result.get("version_name", "Unknown"),
                score=result.get("score", 0),
                risk_level=result.get("risk", "LOW"),
                crash_probability=result.get("crash_probability", "0%"),
                file_hash=file_hash,
                full_report=json.dumps(result)
            )
            db.session.add(new_scan)
            db.session.flush() # flush to get the id
            
            result["id"] = new_scan.id
            new_scan.full_report = json.dumps(result) # re-save with ID
            
            job.status = 'COMPLETED'
            job.progress = 100
            job.result_scan_id = new_scan.id
            db.session.commit()
            logger.info(f"Saved scan result for {new_scan.package_name} to database with hash {file_hash[:8]}")

        except Exception as analysis_error:
            import traceback
            tb = traceback.format_exc()
            logger.error(f"Analysis failed for {filename}: {tb}")
            job.status = 'FAILED'
            job.error_message = f"Failed to analyze APK: {str(analysis_error)}"
            db.session.commit()
        
        # Cleanup
        if is_temp_file and os.path.exists(filepath):
            try:
                os.remove(filepath)
                logger.info(f"Cleaned up file: {filepath}")
            except OSError as cleanup_error:
                logger.error(f"Failed to cleanup file {filepath}: {cleanup_error}")



def cleanup_old_files():
    """Deletes uploaded APKs and decompiled JADX directories older than 2 hours to save disk space on Render."""
    try:
        import time
        import shutil
        now = time.time()
        two_hours_ago = now - 2 * 3600
        
        # 1. Clean uploaded APKs
        if os.path.exists(UPLOAD_FOLDER):
            for f in os.listdir(UPLOAD_FOLDER):
                filepath = os.path.join(UPLOAD_FOLDER, f)
                if os.path.isfile(filepath) and f.endswith(".apk"):
                    if os.path.getmtime(filepath) < two_hours_ago:
                        try:
                            os.remove(filepath)
                            logger.info(f"Auto-cleaned old APK file: {f}")
                        except Exception as e:
                            logger.warning(f"Failed to auto-clean APK {f}: {e}")
                            
        # 2. Clean JADX decompiled outputs
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        custom_tmp = os.path.join(project_root, "backend", "tmp")
        if os.path.exists(custom_tmp):
            for d in os.listdir(custom_tmp):
                dirpath = os.path.join(custom_tmp, d)
                if os.path.isdir(dirpath) and d.startswith("jadx_out_"):
                    if os.path.getmtime(dirpath) < two_hours_ago:
                        try:
                            shutil.rmtree(dirpath, ignore_errors=True)
                            logger.info(f"Auto-cleaned old decompiled directory: {d}")
                        except Exception as e:
                            logger.warning(f"Failed to auto-clean directory {d}: {e}")
    except Exception as e:
        logger.error(f"Error in cleanup_old_files: {e}")

@app.route("/upload", methods=["POST"])
def upload_apk():
    """Endpoint to upload and analyze APK."""
    try:
        is_temp_file = False
        
        # Standard file upload handling
        if "file" not in request.files:
            logger.warning("Upload failed: No file part in request.")
            return jsonify({"error": "No file uploaded. Please provide a 'file' parameter."}), 400

        file = request.files["file"]
        
        if file.filename == '':
            logger.warning("Upload failed: No selected file.")
            return jsonify({"error": "No selected file"}), 400
            
        if not allowed_file(file.filename):
            logger.warning(f"Upload failed: Invalid file extension for {file.filename}.")
            return jsonify({"error": "Invalid file type. Only .apk files are supported."}), 400

        original_filename = werkzeug.utils.secure_filename(file.filename)
        unique_id = str(uuid.uuid4())
        filename = f"{unique_id}_{original_filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        
        logger.info(f"Saving uploaded file to {filepath}")
        file.save(filepath)
        is_temp_file = False  # Keep file for JADX Decompiler
        
        if os.path.getsize(filepath) > MAX_FILE_SIZE_MB * 1024 * 1024:
            os.remove(filepath)
            logger.warning(f"Upload failed: File {filename} exceeds {MAX_FILE_SIZE_MB}MB limit.")
            return jsonify({"error": f"File size exceeds the {MAX_FILE_SIZE_MB}MB limit."}), 413

        logger.info(f"File {filename} prepared. Submitting to queue...")
        
        # Read settings from request
        deep_dex = request.form.get("deep_dex", "true") == "true"
        crash_prediction = request.form.get("crash_prediction", "true") == "true"
        strict_mode = request.form.get("strict_mode", "false") == "true"
        app_type = request.form.get("app_type", "app")

        from flask import session
        user_id = session.get("user_id")

        job_id = str(uuid.uuid4())
        job = AnalysisJob(
            id=job_id,
            user_id=user_id,
            filename=filename,
            status='PENDING',
            progress=0
        )
        db.session.add(job)
        db.session.commit()
        
        executor.submit(
            process_apk_background,
            job_id, filepath, filename, is_temp_file,
            deep_dex, crash_prediction, strict_mode, app_type, user_id
        )
        
        # Asynchronously clean up old files and decompiled directories to free up disk space
        executor.submit(cleanup_old_files)

        return jsonify({"job_id": job_id, "status": "PENDING"}), 200
        
    except Exception as e:
        logger.error(f"Unexpected error in /upload endpoint: {str(e)}", exc_info=True)
        return jsonify({"error": "An unexpected server error occurred."}), 500

@app.route("/api/status/<job_id>", methods=["GET"])
def get_job_status(job_id):
    job = AnalysisJob.query.get(job_id)
    if not job:
        return jsonify({"error": "Job not found"}), 404
        
    response = {
        "status": job.status,
        "progress": job.progress
    }
    
    if job.status == 'COMPLETED':
        scan = ScanResult.query.get(job.result_scan_id)
        if scan:
            response["result"] = json.loads(scan.full_report)
    elif job.status == 'FAILED':
        response["error"] = job.error_message
        
    return jsonify(response), 200


@app.route("/api/history", methods=["GET"])
def get_history():
    """Returns the most recent scan results for the logged in user."""
    try:
        from flask import session
        user_id = session.get("user_id")
        limit = request.args.get("limit", 20, type=int)
        
        if user_id:
            scans = ScanResult.query.filter_by(user_id=user_id).order_by(ScanResult.created_at.desc()).limit(limit).all()
        else:
            scans = ScanResult.query.filter_by(user_id=None).order_by(ScanResult.created_at.desc()).limit(limit).all()
            
        return jsonify([scan.to_dict() for scan in scans]), 200
    except Exception as e:
        logger.error(f"Failed to fetch history: {str(e)}")
        return jsonify({"error": "Failed to fetch history"}), 500

@app.route("/api/analytics", methods=["GET"])
def get_analytics():
    """Returns aggregated analytics for the dashboard."""
    try:
        scans = ScanResult.query.all()
        total_scans = len(scans)
        
        if total_scans == 0:
            return jsonify({
                "total_scans": 0,
                "avg_score": 0,
                "risk_distribution": {"HIGH": 0, "MEDIUM": 0, "LOW": 0},
                "top_bugs": []
            }), 200

        total_score = sum(scan.score or 0 for scan in scans)
        avg_score = round(total_score / total_scans)
        
        risk_dist = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}
        bug_counts = {}

        for scan in scans:
            risk = (scan.risk_level or "LOW").upper()
            if risk in risk_dist:
                risk_dist[risk] += 1
            else:
                risk_dist["LOW"] += 1
                
            try:
                report = json.loads(scan.full_report)
                for issue in report.get("issues", []):
                    title = issue.get("message", "Unknown Issue")
                    if title.startswith("AI Insight: "):
                        title = title.replace("AI Insight: ", "")
                    bug_counts[title] = bug_counts.get(title, 0) + 1
            except:
                pass
                
        sorted_bugs = sorted([{"name": k, "count": v} for k, v in bug_counts.items()], key=lambda x: x["count"], reverse=True)
        top_bugs = sorted_bugs[:5]

        return jsonify({
            "total_scans": total_scans,
            "avg_score": avg_score,
            "risk_distribution": risk_dist,
            "top_bugs": top_bugs
        }), 200
    except Exception as e:
        logger.error(f"Failed to fetch analytics: {str(e)}")
        return jsonify({"error": "Failed to fetch analytics"}), 500

@app.route("/api/validate_secrets/<int:scan_id>", methods=["GET"])
def validate_secrets(scan_id):
    """Runs live active validation on hardcoded secrets found in the APK."""
    try:
        scan = ScanResult.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404
            
        report = json.loads(scan.full_report)
        secrets = report.get("hardcoded_secrets", [])
        
        if not secrets:
            return jsonify({"results": []}), 200
            
        validation_results = run_live_validation(secrets)
        return jsonify({"results": validation_results}), 200
        
    except Exception as e:
        logger.error(f"Failed to validate secrets: {e}")
        return jsonify({"error": str(e)}), 500




@app.route("/api/history/<int:scan_id>", methods=["GET"])
def get_history_detail(scan_id):
    """Returns the full report for a specific scan."""
    try:
        scan = ScanResult.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404
        report = json.loads(scan.full_report)
        report["id"] = scan.id
        return jsonify(report), 200
    except Exception as e:
        logger.error(f"Failed to fetch scan detail: {str(e)}")
        return jsonify({"error": "Failed to fetch scan details"}), 500

import random
@app.route("/api/virustotal/<int:scan_id>", methods=["GET"])
def get_virustotal_report(scan_id):
    """Fetches or mocks a VirusTotal report for a given scan's hash."""
    try:
        scan = ScanResult.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404
        
        file_hash = scan.file_hash
        if not file_hash or file_hash == "unknown":
            return jsonify({"error": "No file hash available for this scan"}), 400
            
        vt_api_key = os.environ.get("VT_API_KEY")
        
        # If no real API key is set, return a mock response that looks like a real VT response.
        # We adjust the mock malicious score based on our own risk_level to make it feel integrated.
        if not vt_api_key:
            malicious_count = 0
            if scan.risk_level == "HIGH":
                malicious_count = random.randint(3, 12)
            elif scan.risk_level == "MEDIUM":
                malicious_count = random.randint(1, 4)
                
            mock_vt_response = {
                "hash": file_hash,
                "status": "completed",
                "malicious": malicious_count,
                "suspicious": random.randint(0, 2),
                "undetected": 74 - malicious_count,
                "engines": {
                    "Kaspersky": "Clean" if malicious_count == 0 else "Trojan.AndroidOS.Generic",
                    "McAfee": "Clean" if malicious_count < 2 else "Artemis!Trojan",
                    "Symantec": "Clean" if malicious_count < 3 else "Android.Malware.Gen"
                },
                "permalink": f"https://www.virustotal.com/gui/file/{file_hash}/detection",
                "mocked": True
            }
            return jsonify(mock_vt_response), 200
            
        # Real API logic
        import requests
        try:
            url = f"https://www.virustotal.com/api/v3/files/{file_hash}"
            headers = {"x-apikey": vt_api_key}
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                data = response.json()
                stats = data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {})
                results = data.get("data", {}).get("attributes", {}).get("last_analysis_results", {})
                engines = {}
                for engine, detail in results.items():
                    if detail.get("category") in ["malicious", "suspicious"]:
                        engines[engine] = detail.get("result", "Malicious")
                        
                if not engines:
                    engines["All Engines"] = "Clean"
                    
                real_vt_response = {
                    "hash": file_hash,
                    "status": "completed",
                    "malicious": stats.get("malicious", 0),
                    "suspicious": stats.get("suspicious", 0),
                    "undetected": stats.get("undetected", 0),
                    "engines": engines,
                    "permalink": f"https://www.virustotal.com/gui/file/{file_hash}",
                    "mocked": False
                }
                return jsonify(real_vt_response), 200
            elif response.status_code == 404:
                return jsonify({"error": "File not found in VirusTotal database. Upload required."}), 404
            else:
                return jsonify({"error": f"VT API Error: {response.status_code}"}), 500
        except Exception as api_e:
            logger.error(f"VT API Request failed: {api_e}")
            return jsonify({"error": "Failed to connect to VirusTotal"}), 500
            
    except Exception as e:
        logger.error(f"Failed to fetch VT report: {str(e)}")
        return jsonify({"error": "Failed to fetch VT report"}), 500

@app.route("/api/testcases/<int:scan_id>", methods=["GET"])
def get_scan_testcases(scan_id):
    """Returns only the test cases for a specific scan."""
    try:
        scan = ScanResult.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404
        
        report = json.loads(scan.full_report)
        test_cases = report.get("custom_test_cases", "No test cases available.")
        
        return jsonify({
            "package": scan.package_name,
            "test_cases": test_cases
        }), 200
    except Exception as e:
        logger.error(f"Failed to fetch test cases: {str(e)}")
        return jsonify({"error": "Failed to fetch test cases"}), 500



@app.route("/api/testcases/latest", methods=["GET"])
def get_latest_testcases():
    """Returns the test cases for the most recent scan."""
    try:
        scan = ScanResult.query.order_by(ScanResult.created_at.desc()).first()
        if not scan:
            return jsonify({"error": "No scans found"}), 404
        
        report = json.loads(scan.full_report)
        test_cases = report.get("custom_test_cases", "No test cases available.")
        
        return jsonify({
            "package": scan.package_name,
            "test_cases": test_cases
        }), 200
    except Exception as e:
        logger.error(f"Failed to fetch latest test cases: {str(e)}")
        return jsonify({"error": "Failed to fetch latest test cases"}), 500

@app.route("/api/history/<int:scan_id>", methods=["DELETE"])
def delete_history(scan_id):
    """Deletes a specific scan result from history."""
    try:
        scan = ScanResult.query.get(scan_id)
        if not scan:
            return jsonify({"error": "Scan not found"}), 404
        db.session.delete(scan)
        db.session.commit()
        logger.info(f"Deleted scan result ID {scan_id} from database.")
        return jsonify({"message": "Successfully deleted"}), 200
    except Exception as e:
        logger.error(f"Failed to delete scan: {str(e)}")
        db.session.rollback()
        return jsonify({"error": "Failed to delete scan"}), 500

@app.route("/api/history/all", methods=["DELETE"])
def delete_all_history():
    """Deletes all scan results from history and clears uploaded files."""
    try:
        num_deleted = db.session.query(ScanResult).delete()
        db.session.commit()
        
        # Clear uploads folder
        import glob
        files = glob.glob(os.path.join(UPLOAD_FOLDER, '*'))
        for f in files:
            try:
                os.remove(f)
            except:
                pass
                
        logger.info(f"Deleted all {num_deleted} scan results from database and cleared uploads folder.")
        return jsonify({"message": f"Successfully deleted {num_deleted} records"}), 200
    except Exception as e:
        logger.error(f"Failed to delete all scans: {str(e)}", exc_info=True)
        db.session.rollback()
        return jsonify({"error": f"Failed to delete all scans: {str(e)}"}), 500

# Bug details API
@app.route("/api/bugs", methods=["GET"])
def get_bugs():
    bugs = {
        "malware_detected": {
            "title": "Malware Detected (VirusTotal)",
            "description": "The application has been flagged by multiple antivirus engines on VirusTotal as potentially malicious.",
            "severity": "Critical",
            "remediation": "Do not install this application. If you are the developer, verify your dependencies and build pipeline for compromised SDKs.",
            "video_url": "https://www.youtube.com/embed/5b-eSgYmGFA"
        },
        "dangerous_permission": {
            "title": "Dangerous Permission Requested",
            "description": "The application requests a permission that is considered dangerous by Android. This could allow the app to access sensitive user data like contacts, SMS, or location.",
            "severity": "High",
            "remediation": "Remove the permission if it's not strictly necessary for the core functionality of the app.",
            "video_url": "https://www.youtube.com/embed/tBIVpI0iE18"
        },
        "debuggable": {
            "title": "Application is Debuggable",
            "description": "The application has the android:debuggable flag set to true in its manifest. This allows anyone to attach a debugger to the app and extract sensitive data or manipulate its execution.",
            "severity": "Critical",
            "remediation": "Set android:debuggable='false' in the AndroidManifest.xml before releasing to production.",
            "video_url": "https://www.youtube.com/embed/5b-eSgYmGFA"
        },
        "exported_component": {
            "title": "Exported Component Without Permission",
            "description": "An Activity, Service, or Receiver is exported (accessible to other apps) but does not require any permission to access. This can lead to unauthorized access or privilege escalation.",
            "severity": "Medium",
            "remediation": "Set android:exported='false' or add a custom android:permission requirement to the component.",
            "video_url": "https://www.youtube.com/embed/D3c80Z_e0Jk"
        },
        "missing_main": {
            "title": "Missing Main Activity",
            "description": "The application does not have a main launcher activity. Users will not be able to launch the app from their home screen.",
            "severity": "Low",
            "remediation": "Ensure at least one Activity has an intent-filter with ACTION_MAIN and CATEGORY_LAUNCHER.",
            "video_url": "https://www.youtube.com/embed/5b-eSgYmGFA"
        },
        "too_many_activities": {
            "title": "Too Many Activities",
            "description": "The app has an excessive number of activities, which can lead to memory bloat and difficult maintainability.",
            "severity": "Low",
            "remediation": "Consider using Fragments or Compose for a single-activity architecture.",
            "video_url": "https://www.youtube.com/embed/1kOS9BcTfkk"
        },
        "no_components": {
            "title": "No Components Found",
            "description": "The app has no declared activities, services, or receivers.",
            "severity": "Medium",
            "remediation": "Verify that the AndroidManifest.xml is properly configured.",
            "video_url": "https://www.youtube.com/embed/1kOS9BcTfkk"
        },
        "hardcoded_secrets": {
            "title": "Hardcoded Secrets / URLs",
            "description": "The app contains hardcoded URLs, API keys, or passwords in its source code. These can be easily extracted by reverse engineering.",
            "severity": "High",
            "remediation": "Store secrets securely on a backend server or use Android Keystore. Do not hardcode them in the DEX.",
            "video_url": "https://www.youtube.com/embed/K7zKxYJb0p8"
        },
        "trackers_found": {
            "title": "Ad Trackers / SDKs Detected",
            "description": "The application contains third-party ad networks or tracking SDKs which may collect user data.",
            "severity": "Medium",
            "remediation": "Review the necessity of these trackers and ensure they comply with your privacy policy. Consider removing unused tracking SDKs to reduce the app's privacy footprint.",
            "video_url": "https://www.youtube.com/embed/5b-eSgYmGFA"
        }
    }
    return jsonify(bugs), 200

# Handle large file errors globally
@app.errorhandler(413)
def request_entity_too_large(error):
    logger.warning("Upload failed: File exceeds MAX_CONTENT_LENGTH.")
    return jsonify({"error": f"File size exceeds the {MAX_FILE_SIZE_MB}MB limit."}), 413

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logger.info(f"Starting APK Analyzer Pro Backend on port {port}")
    # Timeout handling would typically be configured at the WSGI server level (e.g. gunicorn or uWSGI),
    # but we add standard Flask configurations here.
    app.run(host="0.0.0.0", port=port, threaded=True)
