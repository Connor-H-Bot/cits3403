import os 

basedir = os.path.abspath(os.path.dirname(__name__))

class Config(object):
    # Secret key used for storing passwords
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or "you-havent-set-environ-variable"

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

    SQLALCHEMY_TRACK_MODIFICATIONS = False 