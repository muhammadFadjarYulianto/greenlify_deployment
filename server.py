from app import app

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_cors import CORS
# from dotenv import load_dotenv
# import os

# # Load environment variables
# load_dotenv()

# app = Flask(__name__)

# # Database Configuration
# app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD', '')}@{os.getenv('DB_HOST')}/{os.getenv('DB_DATABASE')}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = os.getenv('JWT_SECRET')

# # Inisialisasi CORS
# CORS(app, resources={
#     r"/api/*": {
#         "origins": [
#             "*"
#         ]
#     }
# })

# # Inisialisasi Database
# db = SQLAlchemy(app)
# migrate = Migrate(app, db)

# # Import routes/models setelah inisialisasi
# from app.model import *
# from app.routes import *

# if __name__ == "__main__":
#     app.run(debug=True)