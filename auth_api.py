from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
        
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
        
    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, password_hash=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id
    session["username"] = new_user.username
    
    return jsonify({"success": True, "message": "Registration successful", "username": username})

@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401
        
    session["user_id"] = user.id
    session["username"] = user.username
    
    return jsonify({"success": True, "message": "Login successful", "username": username})

@auth_bp.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Logged out"})

@auth_bp.route("/api/me", methods=["GET"])
def get_me():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"authenticated": False}), 401
    return jsonify({"authenticated": True, "username": session.get("username")})
