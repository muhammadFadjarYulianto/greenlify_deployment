from enum import Enum
from app import db
from datetime import datetime
from app.model.articles import Articles

class Comments(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    id_article = db.Column(db.BigInteger, db.ForeignKey('articles.id', ondelete='CASCADE'), nullable=False)
    username = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    article = db.relationship('Articles', backref=db.backref('comments', lazy=True, cascade="all, delete-orphan"))

    def __repr__(self):
        return '<Comments {}>'.format(self.username)