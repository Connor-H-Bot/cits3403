# Trumpter

Codebase for the Trumpter website. 

# Description

Trumpter is a website that presents the user with two tweets. The aim for the user is to guess which of the two were authored by Donald Trump. 

At the time of his accounts deletion in Jan 2021, Donald Trump had over 50k tweets. Thanks to thetrumparchive.com, there is a now historical database containing all of his tweets, including deleted ones (unless it was deleted before 2016). 

In order to match the controversy/absurdity of Trump's online persona, his own tweets are paired with other outrageous posts from celebrities such as Kanye West,  50 Cent, Ryan Reynolds, ect. 

This website has been designed for the CITS3403 main project. 

## Usage

```terminal
python3 -m venv venv
source venv/bin/activate
export FLASK_DEBUG=1

export FLASK_APP=trumpter.py 

##Packages
pip install -U Flask-SQLAlchemy
pip install Flask-Migrate
pip install flask-login
pip install -U Flask-WTF

## License
[MIT](https://choosealicense.com/licenses/mit/)
