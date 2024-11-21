from app.model.admins import Admins
from app.model.products import Products
from app import response, db
from flask import request
from werkzeug.security import generate_password_hash

def index():
    try:
        admins = Admins.query.all()
        data = format_array(admins)
        return response.success(data, "success")
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil data admin.")

def format_array(datas):
    return [single_object(data) for data in datas]

def single_object(data):
    return {
        'id': data.id,
        'name': data.name,
        'email': data.email,
        'phone_number': data.phone_number,
        'gender': data.gender,
        'created_at': data.created_at,
        'updated_at': data.updated_at
    }

def detail_admin(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], 'Admin tidak ditemukan')

        products = Products.query.filter_by(admin_id=id).all()
        data = single_detail_admin(admin, products)

        return response.success(data, "success")
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil detail admin.")

def single_detail_admin(admin, products):
    return {
        'id': admin.id,
        'name': admin.name,
        'email': admin.email,
        'phone_number': admin.phone_number,
        'gender': admin.gender,
        'created_at': admin.created_at,
        'updated_at': admin.updated_at,
        'products': [single_product(product) for product in products]
    }

def single_product(product):
    return {
        'id': product.id,
        'product_name': product.product_name,
        'title': product.title,
        'summary': product.summary,
        'description': product.description,
        'price': str(product.price),
        'contact': product.contact
    }

def save():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone_number = request.form.get('phone_number')
        gender = request.form.get('gender')

        if not all([name, email, password, phone_number, gender]):
            return response.badRequest([], "Semua kolom wajib diisi.")

        if len(password) < 8:
            return response.badRequest([], "Kata sandi harus terdiri dari minimal 8 karakter.")

        if gender not in ["Laki-Laki", "Perempuan"]:
            return response.badRequest([], "Jenis kelamin tidak valid. Gunakan 'Laki-Laki' atau 'Perempuan'.")

        if Admins.query.filter_by(email=email).first():
            return response.badRequest([], "Email sudah terdaftar.")

        if Admins.query.filter_by(phone_number=phone_number).first():
            return response.badRequest([], "Nomor telepon sudah terdaftar.")

        hashed_password = generate_password_hash(password)

        admin = Admins(
            name=name,
            email=email,
            password=hashed_password,
            phone_number=phone_number,
            gender=gender
        )
        db.session.add(admin)
        db.session.commit()

        return response.success(single_object(admin), 'Sukses Menambahkan Data Admin')
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal menyimpan data admin.")

def ubah(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], "Admin tidak ditemukan.")

        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone_number = request.form.get('phone_number')
        gender = request.form.get('gender')

        if not all([name, email, password, phone_number, gender]):
            return response.badRequest([], "Semua kolom wajib diisi.")

        if gender not in ["Laki-Laki", "Perempuan"]:
            return response.badRequest([], "Jenis kelamin tidak valid. Gunakan 'Laki-Laki' atau 'Perempuan'.")

        admin.name = name
        admin.email = email
        admin.password = generate_password_hash(password)
        admin.phone_number = phone_number
        admin.gender = gender

        db.session.commit()

        return response.success(single_object(admin), "Sukses update data!")
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal mengubah data admin.")

def hapus(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], "Data admin tidak ditemukan.")

        db.session.delete(admin)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!')
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal menghapus data admin.")
