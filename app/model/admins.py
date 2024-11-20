from app import db

class Admins(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(60), index=True, unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    gender = db.Column(db.Enum('Male', 'Female'), nullable=True)

    def __repr__(self):
        return '<Admin {}>'.format(self.name)