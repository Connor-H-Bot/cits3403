from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func


app = Flask(__name__)

#Get the database
db_name = 'app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Trump(db.Model):
    #__tablename__ = 'tweets_trump'
    tweetID = db.Column(db.String, primary_key=True)
    tweetBody = db.Column(db.String)
    year = db.Column(db.Integer)
    likes = db.Column(db.Integer)
    retweets = db.Column(db.Integer)

    def __repr__(self):
        tweet = [self.tweetID, self.tweetBody, self.year, self.likes, self.retweets]
        return str(tweet)

#class NotTrump(db.Model):
#    __tablename__ = 'tweets_other'
#    tweetID = db.Column(db.String, primary_key=True)
#    tweetBody = db.Column(db.String)
#    year = db.Column(db.Integer)
#    likes = db.Column(db.Integer)
#    retweets = db.Column(db.Integer)

#    def __repr__(self):
#        tweet = [self.tweetID, self.tweetBody, self.year, self.likes, self.retweets]
#        return str(tweet)

def myMethod(): #equivalent to      SELECT * FROM table ORDER BY RANDOM() LIMIT 5;
    returned_trump_tweets = Trump.query.filter_by().order_by(func.random()).all()
    #returned_other_tweets = NotTrump.query.filter_by().order_by(func.random()).all()
    return str(returned_trump_tweets[0:5])# + str(returned_other_tweets[0:5])

@app.route('/')
def index():
    try:              
        return myMethod()
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)