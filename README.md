# Trumpter

Codebase for the Trumpter website. 

# Description

At the time of his accounts deletion in Jan 2021, Donald Trump had over 50k tweets. Thanks to thetrumparchive.com, there is a now historical database containing all of his tweets, including deleted ones (unless it was deleted before 2016). 

Trumpter is a website that presents the user with two tweets. The aim for the user is to guess which of the two were authored by Donald Trump. There are 5x rounds per playthrough, and a streak is began by getting all 5 correct.  

In order to match the controversy/absurdity of Trump's online persona, his own tweets are paired with other outrageous posts from celebrities such as Kanye West,  50 Cent, Ryan Reynolds, ect. 

This website has been designed for the CITS3403 main project. The architecture of the website is as follows:

-HTML is divided up into templates, which contain variable content.

-CSS is a mix of bootstrap, content we copy (and reference), and our own custom work. 

-Javascript is used for the game logic, DOM manipulation, and server GET/POST requests. Data is transferred as JSON.

Backend: 

-Flask, with an initial file (trumpter.py) initialising a chain reaction of configurations that create the virtual infrastructure.

-SQLAlchemy for DB migrations, as well as CRUD (create, read, update, delete) operations on the database. SQLITE3 was the selected SQL engine. 

-HTML templates which are sent to the client, and then the data


## Usage

Once inside the main project directory, copy and paste this into your terminal;
```
python3 -m venv venv
source venv/bin/activate
export FLASK_DEBUG=1

pip install -U Flask-SQLAlchemy
pip install Flask-Migrate
pip install flask-login
pip install -U Flask-WTF

flask run
```
After this, your localhost (http://127.0.0.1:5000) will be the address to visit the website. 

## Troubleshooting
Some issues discovered that have easy fixes;

-Pip install being out of date (even by a few versions) stopped the application from running at all. Make sure pip is up to date before entering a virtual environment (venv)

-If you're on an apple computer disable airplay reciever (it uses port: 5000 which interferes with your localhost)

## References
Twitter style CSS: Moshfequr Rahman (2018) Codepen. _https://codepen.io/moshfequr9/pen/wXQbPR_


Donald Trump's tweet archive: Brendan Brown (2016) Trump Tweets Archive. _https://www.thetrumparchive.com/_ **AND** _https://github.com/bpb27/tta-elastic_


Twitter verified badge: Jay Holtslander (2021) Twitter Verified Badge Vector. _https://worldvectorlogo.com/logo/twitter-verified-badge_
