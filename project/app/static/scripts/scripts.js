/*
    Authors: Connor Harris and Kyron Milton
    Javascript file containing code to interact with the buttons and tweets on the main page
*/


//Global variables
var current_streak = 0; // how many guesses the user's got correct
var tweets_shown = 0; //counts how many tweets have been displayed
var trump_tweet = {}; //JSON arrays to hold the current tweet
var other_tweet = {};
var tweets_array = []; // Boolean values for if the tweet is trump [0] = left, [1] = right


// When the window loads it initialises the tweets
window.onload = load_tweets(); 


//Construct the game 
function load_tweets(){ 
    //get_x_json retrieves the two tweets from the server
    get_trump_json(); 
    get_other_json();
    //changes the tweets to grey for a loading procedure
    tweets_refresh_animation(); 
    //populates the tweets with the loaded json
    populate_tweets();
}


// Main function to get the script rolling
function get_trump_json() { //gets trump tweet
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://127.0.0.1:5000/api/getTrump", false);
    xhReq.send(null);
    trump_tweet = JSON.parse(xhReq.responseText);
}
function get_other_json(){ //get non trump tweet
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://127.0.0.1:5000/api/getOther", false);
    xhReq.send(null);
    other_tweet = JSON.parse(xhReq.responseText);
}


//Randomise the position of the trump tweet (decide which side it is on)
function tweet_position() {
    var random_int = (Math.floor(Math.random() * 100) % 2);
    
    if (random_int == 0) {
        tweets_array = [true, false];
        return [trump_tweet, other_tweet];
    }
    else if (random_int == 1) {
        tweets_array = [false, true];
        return [other_tweet, trump_tweet];
    }
}


//Populates the tweets and resets the game to 0. After this all the functions are driven by a mouse click event
function populate_tweets() {
    current_streak = 0; 
    tweets_shown = 0;
    var trump_loc = tweet_position(); //Randomises tweet positions, storing values as an array
    populate_left_tweets(trump_loc[0]);
    populate_right_tweets(trump_loc[1]);
}


//Listen for a click on the tweet
document.getElementById("choice_1").addEventListener("click", choice_1_selected); //Left tweet
document.getElementById("choice_2").addEventListener("click", choice_2_selected); //Right tweet


//Functions to be called when a tweet is clicked
function choice_1_selected() {
    tweet_selected(0, "left_side_tweet", "right_side_tweet"); //Left side tweet
}
function choice_2_selected() {
    tweet_selected(1, "right_side_tweet", "left_side_tweet"); //Right side tweet
}


//Checks if the answer was right/wrong then animates the selection
function tweet_selected(tweet_selected_int, user_selected, not_selected) {
    var is_trump_bool = tweets_array[tweet_selected_int]; //
    var answer_css_array = answer_css(is_trump_bool);
    animate_selection(user_selected, not_selected, answer_css_array);

    if (is_trump_bool == true) {
        //start next round and continue streak
        start_next_round();
    }
    else {
        //start again and display loss of streak
        load_tweets();
    }
}

function start_next_round() {
    
    //if the streak hasnt hit 5
    if (current_streak < 5) {
    current_streak += 1;
    tweets_shown += 2;
    get_trump_json(); 
    get_other_json();
    var trump_loc = tweet_position(); //Randomises tweet positions, storing values as an array
    populate_left_tweets(trump_loc[0]);
    populate_right_tweets(trump_loc[1]);
    document.getElementById("score_box").innerHTML = current_streak + ": Nice, very based";
    }
    else {
        document.getElementById("score_box").innerHTML = "Game won!";
    }
}


function animate_selection(user_selected, not_selected, answer_css_array) {
    document.getElementById(user_selected).classList.add(answer_css_array[0]); //pass the css to start the animation
    document.getElementById(not_selected).classList.add(answer_css_array[1]);
    document.getElementById("left_tweet_content").classList.add("invisible");
    document.getElementById("right_tweet_content").classList.add("invisible");

    //callback function based on timer flip the css back to show the tweets 
    function change_back() { 
        document.getElementById(user_selected).classList.remove(answer_css_array[0]);
        document.getElementById(not_selected).classList.remove(answer_css_array[1]);
        document.getElementById("left_tweet_content").classList.remove("invisible");
    document.getElementById("right_tweet_content").classList.remove("invisible");
    }
    setTimeout(change_back, 1400); //callback after 1.4 seconds
}


function answer_css(index) {
    if (index == true) {
        return ["correct_guess", "wrong_guess"];
    }
    else {
        return ["wrong_guess", "correct_guess"];
    }
}


//Two functions that take the tweet author (JSON) and update the values accordingly
function populate_left_tweets(author) {
    document.getElementById("left_tweet_likes").innerHTML = add_commas(author.likes); //change # of likes
    document.getElementById("left_tweet_retweets").innerHTML = add_commas(author.retweets); // change # of retweets
    document.getElementById("left_tweet_body").innerHTML = extend_tweets_length(author.body); //change the body of the new tweet 
    document.getElementById("left_tweet_comments").innerHTML = add_commas((author.likes - author.retweets)); //comments # = (likes - retweets)
    document.getElementById("left_tweet_date").innerHTML = author.year; //year tweet was posted
}
function populate_right_tweets(author) {
    document.getElementById("right_tweet_likes").innerHTML = add_commas(author.likes); //change # of likes
    document.getElementById("right_tweet_retweets").innerHTML = add_commas(author.retweets); // change # of retweets
    document.getElementById("right_tweet_body").innerHTML = extend_tweets_length(author.body); //change the body of the new tweet 
    document.getElementById("right_tweet_comments").innerHTML = add_commas((author.likes - author.retweets)); //comments # = (likes - retweets)
    document.getElementById("right_tweet_date").innerHTML = author.year; //year tweet was posted
}


// Callback to animate tweets by changing to grey and doing a flip card effect
function tweets_refresh_animation() { 
    document.getElementById("left_side_tweet").classList.add("change_guess"); //change css to flip animation
    document.getElementById("left_tweet_content").classList.add("invisible"); //make tweet content blank 
    document.getElementById("right_side_tweet").classList.add("change_guess");
    document.getElementById("right_tweet_content").classList.add("invisible");
    document.getElementById("score_box").innerHTML = "\"He who is redpilled is not necessarily based, just as he who is bluepilled is not necessarily cringe\" - Confucius"
    
    //callback function for interval to hold animation
    function change_back() { 
        document.getElementById("left_side_tweet").classList.remove("change_guess"); //change it all back
        document.getElementById("left_tweet_content").classList.remove("invisible");
        document.getElementById("right_side_tweet").classList.remove("change_guess");
        document.getElementById("right_tweet_content").classList.remove("invisible");
    }
    setTimeout(change_back, 1000); //callback after 1 second
}

//Change integers to strings and add a comma when its above 3 figures (3000 == 3,000 & 100000 == 100,000)
function add_commas(integer) {
    if (integer < 0) {
        integer = (integer * -1); //change a numbers value to positive if its a negative
    }
    if (integer.toString().length > 3) {
        var int_as_string_arr = (integer.toString()).split(""); //int becomes a string which is split accross an array
        if (int_as_string_arr.length == 4) { // 1,000
            int_as_string_arr.splice(1, 0, ",");
        }
        else if (int_as_string_arr.length == 5) { // 10,000
            int_as_string_arr.splice(2, 0, ",");
        }
        else if (int_as_string_arr.length == 6) { // 100,000
            int_as_string_arr.splice(3, 0, ",");
        }
        return int_as_string_arr.join('');
    }
    return integer;
}


//Extend the length of the tweet body so that its always 150 characters (fills with blank spaces)
function extend_tweets_length(input_string) {
    var lettercount = input_string.length;
    var blank_space = ('\xa0' + ' '); //\xa0 is the symbol for a blank space

    //uses 160 as the current tweet catalogue has nothing above 160 chars
    if (lettercount < 160) { 
        var blanks_to_add = (160 - lettercount);
        blank_space += blank_space.repeat(blanks_to_add); //repeats the spaces to fill 160 chars
    }
    return (input_string + blank_space)
}