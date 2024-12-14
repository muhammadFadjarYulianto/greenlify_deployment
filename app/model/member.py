from app import db
from datetime import datetime


class Member(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    nama_wilayah = db.Column(db.String(100), nullable=False)  # Hapus kolom id_wilayah
    waktu_bergabung = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return '<Member {}>'.format(self.nama_wilayah)

