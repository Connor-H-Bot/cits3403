from app import app, models
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import jsonify, url_for, request
import json

#API for fetching a new trump tweet
@app.route('/api/getTrump', methods=['GET'])
def getTrump(): 
                            #SELECT * FROM tweets_trump ORDER BY RANDOM() LIMIT 1; 
    returned_trump_tweets = models.Trump.query.filter_by().order_by(func.random()).limit(1).all()

    return jsonify(returned_trump_tweets[0].to_dict())

#API route for fetching new non trump tweet
@app.route('/api/getOther', methods=['GET'])
def getOther(): 
                            #SELECT * FROM tweets_trump ORDER BY RANDOM() LIMIT 1;
    returned_other_tweets = models.NotTrump.query.filter_by().order_by(func.random()).limit(1).all()

    return jsonify(returned_other_tweets[0].to_dict())