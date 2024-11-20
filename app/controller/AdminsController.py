from app.model.admins import Admins
from app.model.products import Products

from app import response, app, db
from flask import request

def index():
    try:
        admin = Admins.query.all()
        data = formatarray(admin)
        return response.success(data, "success")
    except Exception as e:
        print(e)

def formatarray(datas):
    array = []

    for i in datas:
        array.append(singleObject(i))
    
    return array

def singleObject(data):
    data = {
        'id' : data.id,
        'name' : data.name,
        'email' : data.email,
        'password' : data.password,
        'phone_number' : data.phone_number,
        'gender' : data.gender
    }

    return data

def detail_admin(id):
    try:
        admin = Admins.query.filter_by(id=id).first()

        if not admin:
            return response.badRequest([], 'Admin tidak ditemukan')

        products = Products.query.filter_by(admin_id=id).all()

        data = singleDetailAdmin(admin, products)

        return response.success(data, "success")
    
    except Exception as e:
        print(e)

def singleDetailAdmin(admin, products):
    data = {
        'id': admin.id,
        'name': admin.name,
        'email': admin.email,
        'phone_number': admin.phone_number,
        'gender': admin.gender,
        'password': admin.password,  
        'products': [singleProduct(product) for product in products] 
    }

    return data

def singleProduct(product):
    data = {
        'id': product.id,
        'product_name': product.product_name,
        'title': product.title,
        'summary': product.summary,
        'description': product.description,
        'price': str(product.price),
        'contact': product.contact
    }

    return data


def save():
    try:
        name = request.form.get('name')    
        email = request.form.get('email')    
        password = request.form.get('password')    
        phone_number = request.form.get('phone_number')    
        gender = request.form.get('gender')    

        admins = Admins(name=name, email=email, password=password, phone_number=phone_number, gender=gender)
        db.session.add(admins)
        db.session.commit()

        return response.success('', 'Sukses Menambahkan Data Admin')
    except Exception as e:
        print(e)

def ubah(id):
    try:
        name = request.form.get('name')    
        email = request.form.get('email')    
        password = request.form.get('password')    
        phone_number = request.form.get('phone_number')    
        gender = request.form.get('gender')   

        input = [
            {
                'name' : name,
                'email' : email,
                'password' : password,
                'phone_number' : phone_number,
                'gender' : gender
            }
        ] 

        admin = Admins.query.filter_by(id=id).first()

        admin.name = name
        admin.email = email
        admin.password = password
        admin.phone_number = phone_number
        admin.gender = gender

        db.session.commit()

        return response.success(input, 'Sukses update data!')
    except Exception as e:
        print(e)

def hapus(id):
    try:
        admin = Admins.query.filter_by(id=id).first()
        if not admin:
            return response.badRequest([], 'Data Admin Kosong...')
        
        db.session.delete(admin)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!')
    except Exception as e:
        print(e)