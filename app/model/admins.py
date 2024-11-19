from app import db
from datetime import datetime

class Admins(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), index=True, unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    phone_number = db.Column(db.String(13), index=True, unique=True, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Admins {}>'.format(self.name)