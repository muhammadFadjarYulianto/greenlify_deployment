from flask import jsonify
from app.model.categories import Categories
from app import db

def add_category(data):
    if "category_name" not in data or not data["category_name"]:
        return jsonify({"error": "Nama kategori wajib diisi."}), 400

    if len(data["category_name"]) < 3:
        return jsonify({"error": "Nama kategori harus terdiri dari minimal 3 karakter."}), 400

    if Categories.query.filter_by(category_name=data["category_name"]).first():
        return jsonify({"error": "Nama kategori sudah ada."}), 400

    try:
        
        category = Categories(category_name=data["category_name"])
        db.session.add(category)
        db.session.commit()
        return jsonify({"message": "Kategori berhasil ditambahkan.", "category_id": category.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Gagal menambahkan kategori: {str(e)}"}), 500
