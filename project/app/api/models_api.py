from app import app, models
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import jsonify, url_for, request

@app.route('/api/getTweets', methods=['GET'])
def getTweets(): #equivalent to      SELECT * FROM table ORDER BY RANDOM(); 

    returned_trump_tweets = models.Trump.query.filter_by().order_by(func.random()).limit(1).all()
    returned_other_tweets = models.NotTrump.query.filter_by().order_by(func.random()).limit(1).all() #return 5 of each tweet type

    #return jsonify(returned_trump_tweets)
    return "Trump: " + str(returned_trump_tweets) + '\n' + "Not Trump: " + str(returned_other_tweets)