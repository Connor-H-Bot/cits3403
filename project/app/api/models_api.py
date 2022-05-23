from sqlalchemy import true
from app import app, models, db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func
from flask import jsonify, redirect, url_for
import json
from app.forms import submitaTweet
from app.models import userStatistics

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


    

#TODO - use currently logged in users ID for the argument
#Get statistics for the logged in user
@app.route('/api/get_stats', methods=['GET'])
def get_stats():
    returned_stats = models.userStatistics.query.filter_by(user_id="1").order_by().all() #todo user ID needs to change to logged in ID
    return jsonify(returned_stats[0].to_dict())


#Admin function to add tweets to the database from the website settings page
@app.route('/api/submitTweet', methods=['POST'])
def submitTweet():
    tweetSubmit = submitaTweet()
    if tweetSubmit.validate_on_submit():
        if tweetSubmit.isTrump == True:
            tweet = models.Trump(tweetBody = tweetSubmit.tweetBody.data, year = tweetSubmit.year.data, likes = tweetSubmit.likes.data, retweets = tweetSubmit.retweets.data)
            db.session.add(tweet)
            db.session.commit()
            return redirect('/Settings')
        else:
            tweet = models.NotTrump(tweetBody = tweetSubmit.tweetBody.data, year = tweetSubmit.year.data, likes = tweetSubmit.likes.data, retweets = tweetSubmit.retweets.data)
            db.session.add(tweet)
            db.session.commit()
            return redirect('/Settings')
    tweetForm = submitaTweet()
    return redirect('/Settings')


#todo - apply it to logged in user
#API route to POST game statistics to the server
@app.route('/', methods=['POST'])
def record_game_stats(end_game_stats): 
    current_stats = models.userStatistics.query.filter_by(user_id="1").order_by().all() #todo user ID needs to change to logged in ID
    current_stats.timesPlayed += 1 

    if (current_stats.currentWinStrk >= current_stats.highestWinStrk): #update highest win streak if current is breaking the record
        current_stats.highestWinStrk += 1

    if end_game_stats.numWins == 1: #if the posted JSON wasnt a loss it wont break any streaks
        current_stats.currentWinStrk += 1
        current_stats.numWins += 1
    elif end_game_stats.numWins == 0: #posted JSOn was a loss, break the streak
        current_stats.currentWinStrk = 0
    
    db.session.add(current_stats)
    db.session.commit()
    


#Adds new users to the database. 
@app.route('/api/addUser', methods=['POST'])
def addUser(Rform):
    user = models.Users(username = Rform.username.data, passwordHash = "", email = Rform.email.data, isAdmin = False)
    user.set_password(Rform.password.data)
    db.session.add(user)
    db.session.commit()