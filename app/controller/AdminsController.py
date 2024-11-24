from app.model.admins import Admins
from app.model.products import Products
from app import response, db
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import *
from datetime import datetime, timedelta

def indexAdmin():
    try:
        admins = Admins.query.all()
        data = format_array(admins)
        return response.success(data, "success", code=200)
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil data admin.", code=400)

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
            return response.badRequest([], 'Admin tidak ditemukan', code=404)

        products = Products.query.filter_by(admin_id=id).all()
        data = single_detail_admin(admin, products)

        return response.success(data, "success", code=200)
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal mengambil detail admin.", code=400)

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
        'created_by': product.admin.name,
        'category_name': product.category.category_name,
        'product_name': product.product_name,
        'description': product.description,
        'price': str(product.price),
        'contact': product.contact,
        'img_file': product.img_file,
        'created_at': product.created_at,
        'updated_at': product.updated_at
    }

def tambahAdmin():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone_number = request.form.get('phone_number')
        gender = request.form.get('gender')

        if not all([name, email, password, phone_number, gender]):
            return response.badRequest([], "Semua kolom wajib diisi.", code=400)

        if len(password) < 8:
            return response.badRequest([], "Kata sandi harus terdiri dari minimal 8 karakter.", code=400)

        if gender not in ["Laki-Laki", "Perempuan"]:
            return response.badRequest([], "Jenis kelamin tidak valid. Gunakan 'Laki-Laki' atau 'Perempuan'.", code=400)

        if Admins.query.filter_by(email=email).first():
            return response.badRequest([], "Email sudah terdaftar.", code=400)

        if Admins.query.filter_by(phone_number=phone_number).first():
            return response.badRequest([], "Nomor telepon sudah terdaftar.", code=400)


        admin = Admins(
            name=name,
            email=email,
            phone_number=phone_number,
            gender=gender
        )
        admin.setPassword(password)
        db.session.add(admin)
        db.session.commit()

        return response.success(single_object(admin), 'Sukses Menambahkan Data Admin', code=201)
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal menyimpan data admin.", code=400)

def ubahAdmin(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], "Admin tidak ditemukan.", code=404)

        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone_number = request.form.get('phone_number')
        gender = request.form.get('gender')

        if not all([name, email, password, phone_number, gender]):
            return response.badRequest([], "Semua kolom wajib diisi.", code=400)

        if gender not in ["Laki-Laki", "Perempuan"]:
            return response.badRequest([], "Jenis kelamin tidak valid. Gunakan 'Laki-Laki' atau 'Perempuan'.", code=400)

        admin.name = name
        admin.email = email
        admin.password = generate_password_hash(password)
        admin.phone_number = phone_number
        admin.gender = gender

        db.session.commit()

        return response.success(single_object(admin), "Sukses update data!", code=200)
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal mengubah data admin.", code=400)

def hapusAdmin(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], "Data admin tidak ditemukan.", code=404)

        db.session.delete(admin)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!', code=200)
    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal menghapus data admin.", code=400)
    
def loginAdmin():
    try:
        email = request.form.get('email')
        password = request.form.get('password')

        admin = Admins.query.filter_by(email=email).first()

        if not admin or not check_password_hash(admin.password, password):
            return response.badRequest([], "Email atau password salah.", code=401)

        access_token = create_access_token(identity=admin.id, expires_delta=timedelta(days=1))

        return response.success({'access_token': access_token}, "Login sukses!", code=200)
    
    except Exception as e:
        print(e)
        return response.badRequest([], "Gagal login.", code=400)
