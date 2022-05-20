from app import app, db 
from app.models import Users
from app.forms import LoginForm, registrationForm
from flask import render_template, redirect
from flask_login import current_user, login_user, logout_user

################################################
######### BELOW CODE HANDLES LOGINS ############
################################################

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect('/')
    form = LoginForm()
    Rform = registrationForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            return render_template('settings.html', form=form , Rform=Rform)        
        login_user(user)
        return redirect('/')
    return render_template('settings.html', form=form , Rform=Rform)

@app.route('/Register', methods=['GET', 'POST'])
def register():
    Rform = registrationForm()
    #if form is validated
    if Rform.validate_on_submit():
        #add user to database
        user = Users(username = Rform.username.data, passwordHash = "", email = Rform.email.data, isAdmin = False)
        user.set_password(Rform.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect('/Settings')
    #else return to same page.
    return render_template('Registration.html', Rform=Rform)


@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')
