from app import db

class Categories(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    category_name = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return '<Category {}>'.format(self.category_name)