from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class registrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class submitaTweet(FlaskForm):
    tweetBody = StringField('Tweet', validators=[DataRequired()])
    year =  IntegerField('Year', validators=[DataRequired()])
    likes = IntegerField('Likes', validators=[DataRequired()])
    retweets = IntegerField('Retweets', validators=[DataRequired()])
    isTrump = BooleanField('Is this a Trump tweet?', validators=[DataRequired()])
    submit = SubmitField('Sign In')