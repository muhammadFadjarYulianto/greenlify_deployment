from app import db
from datetime import datetime
from app.model.admins import Admins
from app.model.categories import Categories

class Products(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    admin_id = db.Column(db.BigInteger, db.ForeignKey('admins.id'), nullable=False)
    category_id = db.Column(db.BigInteger, db.ForeignKey('categories.id'), nullable=False)
    product_name = db.Column(db.String(250), nullable=False)
    title = db.Column(db.String(250), nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    contact = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Products {}>'.format(self.name)