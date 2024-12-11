import os
from dotenv import load_dotenv

load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    HOST = str(os.environ.get("DB_HOST"))
    DATABASE = str(os.environ.get("DB_DATABASE"))
    USERNAME = str(os.environ.get("DB_USERNAME"))
    PASSWORD = str(os.environ.get("DB_PASSWORD",""))

    JWT_SECRET_KEY = str(os.environ.get("JWT_SECRET"))
    if PASSWORD:
        SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + USERNAME + ':' + PASSWORD + '@' + HOST + '/' + DATABASE
    else:
        SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + USERNAME + '@' + HOST + '/' + DATABASE
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_RECORD_QUERIES = True
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'app', 'static')
    PRODUCT_FOLDER = os.path.join(UPLOAD_FOLDER, "products")
    ARTICLE_FOLDER = os.path.join(UPLOAD_FOLDER, "articles")

    STATIC_URL_PATH = os.getenv("STATIC_URL_PATH")
    PRODUCT_URL_PATH = f"{STATIC_URL_PATH}/products"
    ARTICLE_URL_PATH = f"{STATIC_URL_PATH}/articles"

    MAX_CONTENT_LENGTH = 10 * 1024 * 1024
