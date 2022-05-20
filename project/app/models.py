from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login

@login.user_loader
def load_user(id):
    return Users.query.get(int(id))

class Users(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    email = db.Column(db.String(128), index=True, unique=True)
    passwordHash = db.Column(db.String(128))
    isAdmin = db.Column(db.Boolean(False))

    def __repr__(self):
        return '[ID:{}, Username:{}, Email{}, Admin{}]'.format(\
            self.id, self.username, self.email, self.isAdmin
        )

    def to_Dict(self):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'admin': self.isAdmin
        }

    def is_admin(self):
        return self.isAdmin

    def set_password(self, password):
        self.passwordHash = generate_password_hash(password)

    def check_password(self, passsword):
        return check_password_hash(self.passwordHash, passsword)


class Trump(db.Model): #get the trump tweets and return
    __tablename__ = 'tweets_trump'
    tweetID = db.Column(db.String, primary_key=True)
    tweetBody = db.Column(db.String)
    year = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    retweets = db.Column(db.Integer)

    def __repr__(self):
        tweet = [self.tweetID, self.tweetBody, self.year, self.likes, self.retweets]
        return str(tweet)

class NotTrump(db.Model): #return the non trump tweets
    __tablename__ = 'tweets_other'
    tweetID = db.Column(db.String, primary_key=True)
    tweetBody = db.Column(db.String)
    year = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    retweets = db.Column(db.Integer)

    def __repr__(self):
        tweet = [self.tweetID, self.tweetBody, self.year, self.likes, self.retweets]
        return str(tweet)