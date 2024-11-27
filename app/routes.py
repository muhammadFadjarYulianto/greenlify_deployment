from app import app, response
from app.controller import AdminsController, CategoriesController, ProductsController
from flask import request
from flask_jwt_extended import jwt_required

@app.route('/')
def index():
    return 'Hello Flask App'

@app.route('/login', methods=['POST'])
def loginAdmin():
    return AdminsController.loginAdmin()

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    return AdminsController.refreshToken()

@app.route('/admin', methods=['GET', 'POST'])
@jwt_required()
def admins():
    if request.method == 'GET':
        return AdminsController.indexAdmin()
    else:
        return AdminsController.tambahAdmin()

@app.route('/category', methods=['GET', 'POST'])
@jwt_required()
def categories():
    if request.method == 'GET':
        return CategoriesController.indexCategory()
    else:
        return CategoriesController.tambahCategory()

@app.route('/product', methods=['GET', 'POST'])
@jwt_required()
def products():
    if request.method == 'GET':
        return ProductsController.indexProduct()
    else:
        return ProductsController.tambahProduct()

@app.route('/product/<id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def productDetail(id):
    if request.method == 'GET':
        return ProductsController.detail_product(id)
    elif request.method == "PUT":
        return ProductsController.ubahProduct(id)
    elif request.method == "DELETE":
        return ProductsController.hapusProduct(id)

@app.route('/admin/<id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def adminDetail(id):
    if request.method == 'GET':
        return AdminsController.detail_admin(id)
    elif request.method == "PUT":
        return AdminsController.ubahAdmin(id)
    elif request.method == "DELETE":
        return AdminsController.hapusAdmin(id)

@app.route('/category/<id>', methods=["GET", "PUT", "DELETE"])
@jwt_required()
def categoryDetail(id):
    if request.method == 'GET':
        return CategoriesController.detail_category(id)
    elif request.method == "PUT":
        return CategoriesController.ubahCategory(id)
    elif request.method == "DELETE":
        return CategoriesController.hapusCategory(id)

@app.route('/api/product/page', methods=['GET'])
def pagination():
    return ProductsController.paginate()

@app.route('/logout', methods=['POST'])
@jwt_required()  
def logout():
    return AdminsController.logoutAdmin()
