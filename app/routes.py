from flask import render_template, request
from app import app
from app.controller.AdminController import add_admin
from app.controller.CategoryController import add_category
from app.controller.ProductController import add_product
from app.model.admins import Admins
from app.model.categories import Categories
from app.model.products import Products

@app.route('/')
def index():
    return 'Hellow Flask App'

@app.route("/admins/form", methods=["GET"])
def admin_form():
    return render_template("add_admin.html")

@app.route("/admins/add", methods=["POST"])
def process_admin():
    data = {
        "name": request.form["name"],
        "email": request.form["email"],
        "password": request.form["password"],
        "phone_number": request.form["phone_number"],
        "gender": request.form["gender"],
    }
    return add_admin(data)

@app.route("/admins", methods=["GET"])
def list_admins():
    admins = Admins.query.all()
    return render_template("list_admins.html", admins=admins)

@app.route("/categories/form", methods=["GET"])
def category_form():
    return render_template("add_category.html")

@app.route("/categories/add", methods=["POST"])
def process_category():
    data = {
        "category_name": request.form["category_name"]
    }
    return add_category(data)

@app.route("/categories", methods=["GET"])
def list_categories():
    categories = Categories.query.all()
    return render_template("list_categories.html", categories=categories)

@app.route("/products/form", methods=["GET"])
def product_form():
    admins = Admins.query.all()
    categories = Categories.query.all()
    return render_template('add_product.html', admins=admins, categories=categories)


@app.route("/products/add", methods=["POST"])
def process_product():
    data = {
        "admin_id": request.form["admin_id"],
        "category_id": request.form["category_id"],
        "product_name": request.form["product_name"],
        "title": request.form["title"],
        "summary": request.form["summary"],
        "description": request.form["description"],
        "price": request.form["price"],
        "contact": request.form["contact"],
    }
    return add_product(data)

@app.route("/products", methods=["GET"])
def list_products():
    products = Products.query.all()
    return render_template("list_products.html", products=products)