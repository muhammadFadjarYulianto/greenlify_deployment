from app import db
from datetime import datetime


class Member(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    desa = db.Column(db.String(100), nullable=False)
    rw = db.Column(db.Integer, nullable=False)
    rt = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f'<Member {self.desa}>'