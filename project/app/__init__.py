from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
import os


app = Flask(__name__)

app.config.from_object(Config)

# db = SQLAlchemy(app)
# migrate = Migrate(app, db)

db_name = 'app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORT ALL USED PYTHON MODULES
from app import routes, models

