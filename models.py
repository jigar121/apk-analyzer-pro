from flask_sqlalchemy import SQLAlchemy
import datetime
import json

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class ScanResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    package_name = db.Column(db.String(255), nullable=False)
    app_name = db.Column(db.String(255))
    version_name = db.Column(db.String(100))
    score = db.Column(db.Integer)
    risk_level = db.Column(db.String(50))
    crash_probability = db.Column(db.String(20))
    file_hash = db.Column(db.String(100)) # SHA-256
    vt_report = db.Column(db.Text) # JSON string of VirusTotal report
    
    # Store full JSON result
    full_report = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "package": self.package_name,
            "app_name": self.app_name,
            "version_name": self.version_name,
            "score": self.score,
            "risk": self.risk_level,
            "crash_probability": self.crash_probability
        }

class AnalysisJob(db.Model):
    id = db.Column(db.String(36), primary_key=True) # UUID
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    filename = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default='PENDING') # PENDING, RUNNING, COMPLETED, FAILED
    progress = db.Column(db.Integer, default=0)
    result_scan_id = db.Column(db.Integer, db.ForeignKey('scan_result.id'), nullable=True)
    error_message = db.Column(db.Text, nullable=True)
    
    def to_dict(self):
        return {
            "id": self.id,
            "status": self.status,
            "progress": self.progress,
            "result_scan_id": self.result_scan_id,
            "error_message": self.error_message
        }
