from flask import jsonify
from app.model.products import Products
from app.model.admins import Admins
from app.model.categories import Categories
from app import db

def add_product(data):
    if not all(key in data for key in ["admin_id", "category_id", "product_name", "title", "summary", "description", "price", "contact"]):
        return jsonify({"error": "Semua kolom wajib diisi."}), 400

    admin = Admins.query.filter_by(id=data["admin_id"]).first()
    if not admin:
        return jsonify({"error": "Admin ID tidak valid."}), 400

    category = Categories.query.filter_by(id=data["category_id"]).first()
    if not category:
        return jsonify({"error": "Category ID tidak valid."}), 400

    try:
        price = float(data["price"])  # Convert price to float
        if price <= 0:
            return jsonify({"error": "Harga harus lebih besar dari 0."}), 400
    except ValueError:
        return jsonify({"error": "Harga harus berupa angka."}), 400

    try:
        product = Products(
            admin_id=data["admin_id"],
            category_id=data["category_id"],
            product_name=data["product_name"],
            title=data["title"],
            summary=data["summary"],
            description=data["description"],
            price=price,
            contact=data["contact"]
        )
        db.session.add(product)
        db.session.commit()
        return jsonify({"message": "Produk berhasil ditambahkan.", "product_id": product.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Gagal menambahkan produk: {str(e)}"}), 500
