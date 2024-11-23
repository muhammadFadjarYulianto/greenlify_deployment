from flask import request, jsonify, abort
from app.model.products import Products
from app.model.admins import Admins
from app.model.categories import Categories
from app import response, db, uploadconfig, app
import uuid
import os
from werkzeug.utils import secure_filename
import math

def indexProduct():
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
        'img_file': data.img_file,
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

def tambahProduct():
    try:
        created_by = request.form.get('created_by')
        category_id = request.form.get('category_id')
        product_name = request.form.get('product_name')
        description = request.form.get('description')
        price = request.form.get('price')
        contact = request.form.get('contact')

        if 'img_file' not in request.files:
            return response.badRequest([], 'File tidak tersedia')
        
        file = request.files['img_file']

        if file.filename == '':
            return response.badRequest([], 'File tidak tersedia')
        
        if file and uploadconfig.allowed_file(file.filename):
            uid = uuid.uuid4()
            filename = secure_filename(file.filename)
            renamefile = "GreenLify-Product-"+str(uid)+filename

            file.save(os.path.join(app.config['UPLOAD_FOLDER'], renamefile))

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
            img_file=renamefile
        )

        db.session.add(product)
        db.session.commit()

        return response.success(single_object(product), 'Sukses Menambahkan Data Produk')

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], f"Gagal menambahkan produk: {str(e)}")

def ubahProduct(id):
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
        
        img_file = None
        if 'img_file' in request.files:
            file = request.files['img_file']
            if file.filename != '' and uploadconfig.allowed_file(file.filename):
                uid = uuid.uuid4()
                filename = secure_filename(file.filename)
                img_file = "GreenLify-Product-" + str(uid) + filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], img_file))

        if not all([created_by, category_id, product_name, price]):
            return response.badRequest([], "Kolom created_by, category_id, product_name, dan price wajib diisi.")

        product.created_by = created_by
        product.category_id = category_id
        product.product_name = product_name
        product.description = description
        product.price = price
        product.contact = contact
        
        if img_file:
            product.img_file = img_file

        db.session.commit()

        return response.success(single_object(product), 'Sukses update data produk!')

    except Exception as e:
        db.session.rollback()
        print(e)
        return response.badRequest([], "Gagal mengubah data produk.")

def hapusProduk(id):
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
    
def get_pagination(clss, url, start, limit):
    #ambil data select
    results = clss.query.all()
    #ubah format
    data = format_array(results)
    #hitung jumlah data
    count = len(data)

    obj = {}

    if count < start:
        obj['success'] = False
        obj['message'] = "Page yang dipilih melewati batas total data!"
        return obj
    else:
        obj['success'] = True
        obj['start_page'] = start
        obj['per_page'] = limit
        obj['total_data'] = count
        obj['total_page'] = math.ceil(count/limit)

        #previous link
        if start == 1:
            obj['previous'] = ''
        else:
            start_copy = max(1, start-limit)
            limit_copy = start - 1
            obj['previous'] = url + '?start=%d&limit=%d' % (start_copy, limit_copy)

        #next link
        if start + limit > count:
            obj['next'] = ''
        else:
            start_copy = start + limit
            obj['next'] = url + '?start=%d&limit=%d' % (start_copy, limit)

        obj['results'] = data[(start - 1): (start - 1 + limit)]
        return obj
    
#fungsi paging
def paginate():
    #ambil parameter get
    #sample www.google.com?product=baju

    start = request.args.get('start')
    limit = request.args.get('limit')

    try:
        if start == None or limit == None:
            return jsonify(get_pagination(
                Products,
                'http://127.0.0.1:5000/api/product/page',
                start=request.args.get('start', 1),
                limit = request.args.get('limit', 3)
            ))
        else:
            return jsonify(get_pagination(
                Products,
                'http://127.0.0.1:5000/api/product/page',
                start = int(start),
                limit = int(limit)
            ))
    except Exception as e:
        print(e)