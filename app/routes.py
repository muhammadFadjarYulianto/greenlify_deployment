from app import app
from app.controller import AdminsController, CategoriesController, ProductsController
from flask import request

@app.route('/')
def index():
    return 'Hello Flask App'

@app.route('/admin', methods=['GET', 'POST'])
def dosens():
    if request.method == 'GET':
        return AdminsController.index()
    else:
        return AdminsController.save()

@app.route('/category', methods=['GET', 'POST'])
def categories():
    if request.method == 'GET':
        return CategoriesController.index()
    else:
        return CategoriesController.save()

@app.route('/product', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        return ProductsController.index()
    else:
        return ProductsController.save()

@app.route('/product/<id>', methods=["GET", "PUT", "DELETE"])
def productDetail(id):
    if request.method == 'GET':
        return ProductsController.detail_product(id)
    elif request.method == "PUT":
        return ProductsController.ubah(id)
    elif request.method == "DELETE":
        return ProductsController.hapus(id)

@app.route('/admin/<id>', methods=["GET", "PUT", "DELETE"])
def adminDetail(id):
    if request.method == 'GET':
        return AdminsController.detail_admin(id)
    elif request.method == "PUT":
        return AdminsController.ubah(id)
    elif request.method == "DELETE":
        return AdminsController.hapus(id)

@app.route('/category/<id>', methods=["GET", "PUT", "DELETE"])
def categoryDetail(id):
    if request.method == 'GET':
        return CategoriesController.detail_category(id)
    elif request.method == "PUT":
        return CategoriesController.ubah(id)
    elif request.method == "DELETE":
        return CategoriesController.hapus(id)