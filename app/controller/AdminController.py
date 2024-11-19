from flask import jsonify
from werkzeug.security import generate_password_hash
from app.model.admins import Admins
from app import db

def add_admin(data):

    if not all(key in data for key in ["name", "email", "password", "phone_number", "gender"]):
        return jsonify({"error": "Semua kolom wajib diisi."}), 400

    if len(data["password"]) < 8:
        return jsonify({"error": "Kata sandi harus terdiri dari minimal 8 karakter."}), 400

    if data["gender"] not in ["L", "P"]:
        return jsonify({"error": "Jenis kelamin tidak valid. Gunakan 'L' untuk laki-laki atau 'P' untuk perempuan."}), 400

    if Admins.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email sudah terdaftar."}), 400

    if Admins.query.filter_by(phone_number=data["phone_number"]).first():
        return jsonify({"error": "Nomor telepon sudah terdaftar."}), 400

    
    hashed_password = generate_password_hash(data["password"])

    try:
    
        admin = Admins(
            name=data["name"],
            email=data["email"],
            password=hashed_password,
            phone_number=data["phone_number"],
            gender=data["gender"]
        )
        db.session.add(admin)
        db.session.commit()
        return jsonify({"message": "Admin berhasil ditambahkan.", "admin_id": admin.id}), 201
    except Exception as e:
        db.session.rollback()        
        return jsonify({"error": f"Gagal menambahkan admin: {str(e)}"}), 500
