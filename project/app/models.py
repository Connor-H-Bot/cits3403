from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    email = db.Column(db.String(128), index=True, unique=True)
    passwordHash = db.Column(db.String(128))
    isAdmin = db.Column(db.Boolean(None))

    def isAdmin(self):
        return None