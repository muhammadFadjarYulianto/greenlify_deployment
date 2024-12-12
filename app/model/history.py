from app import db
from datetime import datetime

class History(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    waste_type = db.Column(db.String(100), nullable=False)
    accuracy = db.Column(db.Numeric(5, 2), nullable=False) 

    def __repr__(self):
        return '<History {} - {}>'.format(self.timestamp, self.waste_type)