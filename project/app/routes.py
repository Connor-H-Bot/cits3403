from urllib.request import url2pathname
from app import app
from app.api import models_api
from flask import render_template, redirect, session
from app.forms import LoginForm, registrationForm, submitaTweet
from datetime import timedelta
from flask_login import current_user
from app.models import Users

app.permanent_session_lifetime = timedelta(minutes=30)

# Main route to the website.
@app.route('/')
def landing_page():
    return render_template('home.html')

# Route to display view of settings page
@app.route('/Settings')
def settings():
    form = LoginForm()
    if current_user.is_authenticated:
        user = Users.query.filter_by(id=current_user.get_id()).first()
        if user.is_admin() == False:
            return render_template('settingsLoggedIn.html')
        else:
            tweetForm = submitaTweet()
            return render_template('settingsADM.html', tweetForm=tweetForm)
    return render_template('settings.html', form=form)

@app.route('/Settings/Registration')
def registration():
    Rform = registrationForm()
    return render_template('Registration.html', Rform=Rform)
    
# Route to siplay view of how to play screen
@app.route('/How-to-play')
def howToPlay():
    return render_template('how-to-play.html')