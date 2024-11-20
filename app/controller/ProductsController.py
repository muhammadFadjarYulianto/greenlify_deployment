from app.model.products import Products
from app.model.admins import Admins
from app.model.categories import Categories

from app import response, app, db
from flask import request

def index():
    try:
        product = Products.query.all()
        data = formatarray(product)
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
        'admin_id' : data.admin_id,
        'category_id' : data.category_id,
        'product_name' : data.product_name,
        'title' : data.title,
        'summary' : data.summary,
        'description' : data.description,
        'price' : data.price,
        'contact' : data.contact
    }

    return data

def detail_product(id):
    try:
        product = Products.query.filter_by(id=id).first()

        if not product:
            return response.badRequest([], 'Produk tidak ditemukan')

        admin = product.admin
        category = product.category

        data = singleDetailProduct(product, admin, category)

        return response.success(data, "success")
    
    except Exception as e:
        print(e)

def singleDetailProduct(product, admin, category):
    data = {
        'id': product.id,
        'product_name': product.product_name,
        'title': product.title,
        'summary': product.summary,
        'description': product.description,
        'price': str(product.price),
        'contact': product.contact,
        'admin': singleAdmin(admin),
        'category': singleCategory(category)
    }

    return data

def singleAdmin(admin):
    data = {
        'id': admin.id,
        'name': admin.name,
        'email': admin.email,
        'phone_number': admin.phone_number,
        'gender': admin.gender
    }

    return data

def singleCategory(category):
    data = {
        'id': category.id,
        'category_name': category.category_name
    }

    return data

def save():
    try:
        admin_id = request.form.get('admin_id')      
        category_id = request.form.get('category_id')      
        product_name = request.form.get('product_name')      
        title = request.form.get('title')      
        summary = request.form.get('summary')      
        description = request.form.get('description')      
        price = request.form.get('price')      
        contact = request.form.get('contact')      

        products = Products(admin_id=admin_id, category_id=category_id, product_name=product_name, title=title, summary=summary, description=description, price=price, contact=contact)
        db.session.add(products)
        db.session.commit()

        return response.success('', 'Sukses Menambahkan Data Product')
    except Exception as e:
        print(e)

def ubah(id):
    try:
        admin_id = request.form.get('admin_id')    
        category_id = request.form.get('category_id')    
        product_name = request.form.get('product_name')    
        title = request.form.get('title')    
        summary = request.form.get('summary')   
        description = request.form.get('description')   
        price = request.form.get('price')   
        contact = request.form.get('contact')   

        input = [
            {
                'admin_id' : admin_id,
                'category_id' : category_id,
                'product_name' : product_name,
                'title' : title,
                'summary' : summary,
                'description' : description,
                'price' : price,
                'contact' : contact
            }
        ] 

        product = Products.query.filter_by(id=id).first()

        product.admin_id = admin_id
        product.category_id = category_id
        product.product_name = product_name
        product.title = title
        product.summary = summary
        product.description = description
        product.price = price
        product.contact = contact

        db.session.commit()

        return response.success(input, 'Sukses update data!')
    except Exception as e:
        print(e)

def hapus(id):
    try:
        product = Products.query.filter_by(id=id).first()
        if not product:
            return response.badRequest([], 'Data Product Kosong...')
        
        db.session.delete(product)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!')
    except Exception as e:
        print(e)