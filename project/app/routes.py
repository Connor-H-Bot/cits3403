from urllib.request import url2pathname
from app import app
from app.api import models_api
from flask import render_template, redirect, session
from app.forms import LoginForm
from datetime import timedelta

app.permanent_session_lifetime = timedelta(minutes=30)

# Main route to the website.
@app.route('/')
def landing_page():
    # x = models_api.getTweets() THIS WORKS NOW 
    return render_template('home.html')
   
# Route to display view of settings page
@app.route('/Settings')
def settings():
    if "user" in session:
        user=session["user"]
        return render_template('settingsADM.html')
    form = LoginForm()
    return render_template('settings.html', form=form)

# Route to siplay view of how to play screen
@app.route('/How-to-play')
def howToPlay():
    return render_template('how-to-play.html')

@app.route('/Settings', methods=['POST', 'GET'])
def login():
    #Creates a form to be referenced by method and template 
    form = LoginForm()
    #check to see if form was validated
    if form.validate_on_submit():
        #get the user name from the form
        user = form.username.data
        #create a session for that username so their log in can persist
        session.permanent=True
        session["user"] = user
        #redirect back to main screen to paly game
        return redirect('/')
    #invalid log in attempt, go back to login screen (settings)
    return render_template('settings.html', form=form)

@app.route('/logout')
def logout():
    session.pop("user", None)
    return redirect('/')