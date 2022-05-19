from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    email = db.Column(db.String(128), index=True, unique=True)
    passwordHash = db.Column(db.String(128))
    isAdmin = db.Column(db.Boolean(None))

    def isAdmin(self):
        return None

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