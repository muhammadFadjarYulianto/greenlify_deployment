from flask import request
from app.model.products import Products
from app.model.admins import Admins
from app.model.categories import Categories
from app import response, db

def index():
    try:
        products = Products.query.all()
        data = format_array(products)
        return response.success(data, "Success")
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil data produk.")

def format_array(datas):
    return [single_object(data) for data in datas]

def single_object(data):
    return {
        'id': data.id,
        'created_by': data.admin.name,
        'category_name': data.category.category_name,
        'product_name': data.product_name,
        'description': data.description,
        'price': str(data.price),
        'contact': data.contact,
        'img_url': data.img_url,
        'created_at': data.created_at,
        'updated_at': data.updated_at
    }

def detail_product(id):
    try:
        product = Products.query.filter_by(id=id).first()
        if not product:
            return response.badRequest([], 'Produk tidak ditemukan')

        data = single_object(product)
        return response.success(data, "Success")
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil detail produk.")

def save():
    try:
        created_by = request.form.get('created_by')
        category_id = request.form.get('category_id')
        product_name = request.form.get('product_name')
        description = request.form.get('description')
        price = request.form.get('price')
        contact = request.form.get('contact')
        img_url = request.form.get('img_url')

        if not all([created_by, category_id, product_name, price]):
            return response.badRequest([], "Kolom created_by, category_id, product_name, dan price wajib diisi.")

        admin = Admins.query.filter_by(id=created_by).first()
        if not admin:
            return response.badRequest([], "Admin ID tidak valid.")

        category = Categories.query.filter_by(id=category_id).first()
        if not category:
            return response.badRequest([], "Category ID tidak valid.")

        try:
            price = float(price)
            if price <= 0:
                return response.badRequest([], "Harga harus lebih besar dari 0.")
        except ValueError:
            return response.badRequest([], "Harga harus berupa angka.")

        product = Products(
            created_by=created_by,
            category_id=category_id,
            product_name=product_name,
            description=description,
            price=price,
            contact=contact,
            img_url=img_url
        )

        db.session.add(product)
        db.session.commit()

        return response.success(single_object(product), 'Sukses Menambahkan Data Produk')

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], f"Gagal menambahkan produk: {str(e)}")

def ubah(id):
    try:
        product = Products.query.filter_by(id=id).first()
        if not product:
            return response.badRequest([], "Produk tidak ditemukan.")

        created_by = request.form.get('created_by')
        category_id = request.form.get('category_id')
        product_name = request.form.get('product_name')
        description = request.form.get('description')
        price = request.form.get('price')
        contact = request.form.get('contact')
        img_url = request.form.get('img_url')

        if not all([created_by, category_id, product_name, price]):
            return response.badRequest([], "Kolom created_by, category_id, product_name, dan price wajib diisi.")

        product.created_by = created_by
        product.category_id = category_id
        product.product_name = product_name
        product.description = description
        product.price = price
        product.contact = contact
        product.img_url = img_url

        db.session.commit()

        return response.success(single_object(product), 'Sukses update data produk!')

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal mengubah data produk.")

def hapus(id):
    try:
        product = Products.query.filter_by(id=id).first()
        if not product:
            return response.badRequest([], "Produk tidak ditemukan.")

        db.session.delete(product)
        db.session.commit()

        return response.success('', 'Sukses menghapus produk!')

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal menghapus produk.")
