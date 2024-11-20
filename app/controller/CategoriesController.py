from app.model.categories import Categories
from app.model.products import Products

from app import response, app, db
from flask import request

def index():
    try:
        category = Categories.query.all()
        data = formatarray(category)
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
        'category_name' : data.category_name,
    }

    return data

def detail_category(id):
    try:
        category = Categories.query.filter_by(id=id).first()

        if not category:
            return response.badRequest([], 'Kategori tidak ditemukan')

        products = Products.query.filter_by(category_id=id).all()

        data = singleDetailCategory(category, products)

        return response.success(data, "success")
    
    except Exception as e:
        print(e)

def singleDetailCategory(category, products):
    data = {
        'id': category.id,
        'category_name': category.category_name,
        'products': [singleProduct(product) for product in products]  # Menyertakan produk yang terkait kategori
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
        category_name = request.form.get('category_name')      

        categories = Categories(category_name=category_name)
        db.session.add(categories)
        db.session.commit()

        return response.success('', 'Sukses Menambahkan Data Category')
    except Exception as e:
        print(e)

def ubah(id):
    try:
        category_name = request.form.get('category_name')      

        input = [
            {
                'category_name' : category_name,
            }
        ] 

        category = Categories.query.filter_by(id=id).first()

        category.category_name = category_name

        db.session.commit()

        return response.success(input, 'Sukses update data!')
    except Exception as e:
        print(e)

def hapus(id):
    try:
        category = Categories.query.filter_by(id=id).first()
        if not category:
            return response.badRequest([], 'Data Category Kosong...')
        
        db.session.delete(category)
        db.session.commit()

        return response.success('', 'Berhasil menghapus data!')
    except Exception as e:
        print(e)