from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, Length, EqualTo

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8, max=20)])
    submit = SubmitField('Sign In')

class registrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8, max=20)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), Length(min=8, max=20), EqualTo('password')])
    submit = SubmitField('Register')

class submitaTweet(FlaskForm):
    tweetBody = StringField('Tweet', validators=[DataRequired(), Length(min=32, max=240)])
    year =  IntegerField('Year', validators=[DataRequired(), Length(min=4, max=4)])
    likes = IntegerField('Likes', validators=[DataRequired(), Length(min=1, max=8)])
    retweets = IntegerField('Retweets', validators=[DataRequired(), Length(min=1, max=7)])
    isTrump = BooleanField('Is this a Trump tweet?')
    submit = SubmitField('Submit Tweet')