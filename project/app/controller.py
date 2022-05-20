from app import app, db 
from app.models import Users
from app.api.models_api import addUser
from app.forms import LoginForm, registrationForm
from flask import render_template, redirect
from flask_login import current_user, login_user, logout_user

################################################
######### BELOW CODE HANDLES LOGINS ############
################################################

#Route associated with the login form submit
@app.route('/login', methods=['GET', 'POST'])
def login():
    #check if there is a current user session associated with the clients browser 
    if current_user.is_authenticated:
        return redirect('/')
    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return render_template('settings.html', form=form)        
        login_user(user)
        return redirect('/')
    return render_template('settings.html', form=form)

#Route associated with the registration form submit
@app.route('/Register', methods=['GET', 'POST'])
def register():
    #create reg form
    Rform = registrationForm()
    #if form is validated.
    if Rform.validate_on_submit():
        #add user to database with api call.
        addUser(Rform)
        return redirect('/Settings')
    #else return to same page, so user can reattempt.
    return render_template('Registration.html', Rform=Rform)

#Route asssociated with the logout button sumbit action
@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')
