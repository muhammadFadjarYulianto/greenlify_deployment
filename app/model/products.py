from app import db
from app.model.admins import Admins
from app.model.categories import Categories

class Products(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    admin_id = db.Column(db.BigInteger, db.ForeignKey('admins.id', ondelete="CASCADE"), nullable=False)
    category_id = db.Column(db.BigInteger, db.ForeignKey('categories.id', ondelete="CASCADE"), nullable=False)
    product_name = db.Column(db.String(150), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    contact = db.Column(db.String(100), nullable=True)

    admin = db.relationship('Admins', backref=db.backref('products', lazy=True))
    category = db.relationship('Categories', backref=db.backref('products', lazy=True))

    def __repr__(self):
        return '<Product {}>'.format(self.product_name)