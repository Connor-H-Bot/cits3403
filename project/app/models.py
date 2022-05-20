from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    email = db.Column(db.String(128), index=True, unique=True)
    passwordHash = db.Column(db.String(128))
    isAdmin = db.Column(db.Boolean(None))

    def isAdmin(self):
        return None

class Trump(db.Model): #return the trump tweets as a dictionary
    __tablename__ = 'tweets_trump'
    tweetID = db.Column(db.String, primary_key=True)
    tweetBody = db.Column(db.String)
    year = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    retweets = db.Column(db.Integer)

    def to_dict(self):
        tweet = {
            "id": self.tweetID,
            "body": self.tweetBody,
            "year": self.year,
            "likes": self.likes,
            "retweets": self.retweets,
            "isTrump": True
        }
        return tweet

class NotTrump(db.Model): #return the non trump tweets as dictionary
    __tablename__ = 'tweets_other'
    tweetID = db.Column(db.String, primary_key=True)
    tweetBody = db.Column(db.String)
    year = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    retweets = db.Column(db.Integer)

    def to_dict(self):
        tweet = {
            "id": self.tweetID,
            "body": self.tweetBody,
            "year": self.year,
            "likes": self.likes,
            "retweets": self.retweets,
            "isTrump": False
        }
        return tweet