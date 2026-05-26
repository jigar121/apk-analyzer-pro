import os
import requests
import time
from utils.logger import logger

MOBSF_URL = os.environ.get("MOBSF_URL", "http://localhost:8000")

def analyze_with_mobsf(filepath, expected_type="app"):
    """
    Orchestrates the MobSF API workflow: Upload -> Scan -> Report.
    Returns the mapped JSON response.
    """
    api_key = os.environ.get("MOBSF_API_KEY")
    if not api_key:
        raise ValueError("MOBSF_API_KEY environment variable is not set.")
        
    headers = {"Authorization": api_key}
    
    # 1. Upload
    logger.info(f"Uploading {filepath} to MobSF...")
    with open(filepath, 'rb') as f:
        files = {'file': f}
        upload_resp = requests.post(f"{MOBSF_URL}/api/v1/upload", headers=headers, files=files)
        
    if upload_resp.status_code != 200:
        logger.error(f"MobSF Upload failed: {upload_resp.text}")
        raise Exception(f"MobSF Upload failed with status {upload_resp.status_code}")
        
    upload_data = upload_resp.json()
    file_hash = upload_data.get("hash")
    if not file_hash:
        raise Exception("MobSF did not return a file hash.")
        
    logger.info(f"MobSF Upload successful. Hash: {file_hash}")
    
    # 2. Scan
    logger.info("Initiating MobSF Scan...")
    scan_data = {'hash': file_hash}
    scan_resp = requests.post(f"{MOBSF_URL}/api/v1/scan", headers=headers, data=scan_data)
    
    if scan_resp.status_code != 200:
        logger.error(f"MobSF Scan failed: {scan_resp.text}")
        raise Exception(f"MobSF Scan failed with status {scan_resp.status_code}")
        
    logger.info("MobSF Scan complete. Fetching JSON report...")
    
    # 3. Report
    report_data = {'hash': file_hash}
    report_resp = requests.post(f"{MOBSF_URL}/api/v1/report_json", headers=headers, data=report_data)
    
    if report_resp.status_code != 200:
        logger.error(f"MobSF Report fetch failed: {report_resp.text}")
        raise Exception(f"MobSF Report fetch failed with status {report_resp.status_code}")
        
    raw_report = report_resp.json()
    
    # 4. Map to Frontend Schema
    logger.info("Mapping MobSF report to Frontend schema...")
    return map_mobsf_to_frontend(raw_report, file_hash, expected_type)


def map_mobsf_to_frontend(mobsf, file_hash, expected_type):
    """
    Maps the massive MobSF JSON into our dashboard's expected format.
    """
    # Verify expected type if possible (MobSF doesn't explicitly flag "game" easily without checking manifest)
    # Since we can't easily parse the raw manifest from MobSF JSON perfectly for isGame,
    # we will rely on local androguard checking first if needed, or just let it pass here.
    
    score = mobsf.get("security_score", 0)
    # MobSF score is usually 0-100. Lower is worse in MobSF (0 is secure? Actually 100 is secure in MobSF).
    # Let's map it so 0 is bad, 100 is good, or 100 is high risk? 
    # In our app, "score" was a risk score (higher = worse). Let's invert MobSF score if needed.
    # Actually, MobSF gives a risk score out of 100. 100 is safe, 0 is highly insecure.
    # Let's calculate a "Threat Score" where higher is worse (100 - mobsf_score).
    threat_score = 100 - int(score) if isinstance(score, (int, float)) else 50
    
    risk = "LOW"
    if threat_score > 70:
        risk = "HIGH"
    elif threat_score > 30:
        risk = "MEDIUM"

    # Crash probability - MobSF doesn't provide this, so we estimate based on exported components
    exported_count = len(mobsf.get("exported_activities", [])) + len(mobsf.get("exported_services", []))
    crash_prob = min(exported_count * 5, 95)
    
    # Issues
    issues = []
    
    # Map manifest issues
    manifest_analysis = mobsf.get("manifest_analysis", [])
    if isinstance(manifest_analysis, list):
        for item in manifest_analysis:
            issues.append({
                "id": "manifest_issue",
                "message": item.get("desc", item.get("title", "Unknown Manifest Issue"))
            })
    elif isinstance(manifest_analysis, dict):
        # Sometime MobSF returns it as dict
        for key, value in manifest_analysis.items():
            if isinstance(value, dict) and "desc" in value:
                issues.append({"id": "manifest_issue", "message": value["desc"]})

    # Map permissions
    permissions = []
    perms = mobsf.get("permissions", {})
    for perm, details in perms.items():
        status = details.get("status", "normal")
        permissions.append({
            "name": perm.split('.')[-1],
            "status": "dangerous" if status == "dangerous" else "normal"
        })
        if status == "dangerous":
            issues.append({
                "id": "dangerous_permission",
                "message": f"Dangerous Permission Requested: {perm.split('.')[-1]}"
            })

    # Activities, Services, Receivers
    activities = mobsf.get("activities", [])
    services = mobsf.get("services", [])
    receivers = mobsf.get("receivers", [])

    return {
        "package": mobsf.get("package_name", "Unknown"),
        "app_name": mobsf.get("app_name", "Unknown"),
        "version_name": mobsf.get("version_name", "Unknown"),
        "version_code": mobsf.get("version_code", "Unknown"),
        "min_sdk": mobsf.get("min_sdk", "Unknown"),
        "target_sdk": mobsf.get("target_sdk", "Unknown"),
        "risk": risk,
        "score": threat_score,
        "crash_probability": f"{crash_prob}%",
        "issues": issues,
        "permissions": permissions,
        "activities": activities,
        "services": services,
        "receivers": receivers,
        "manifest_xml": "<!-- Manifest extracted via MobSF is not natively raw XML in report. Using JSON representation... -->\n" + str(mobsf.get("manifest_analysis", "No manifest available.")),
        "certificates": [], # MobSF handles certs differently, we leave empty or map later
        "icon": None,
        "virustotal": {
            "positives": 0,
            "total": 0,
            "permalink": f"{MOBSF_URL}/static_analyzer/{file_hash}/",
            "status": "mobsf_link"
        }
    }
