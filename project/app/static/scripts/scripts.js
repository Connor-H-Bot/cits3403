/*
    Authors: Connor Harris and Kyron Milton
    Javascript file containing code to interact with the buttons and tweets on the main page
*/


//Global variables for total guesses and total answers
var totalGuesses = 0; 
var totalCorrect = 0;
var tweets_shown = 0; 
var trump_tweet = {}; //JSON arrays to hold the current tweet
var other_tweet = {};
var tweets_array = []; // Boolean values for if the tweet is trump [0] = left, [1] = right
var is_trump_bool = false;


window.onload = load_tweets(); //loads tweets


function load_tweets(){ //Main constructor. Calls tweets, then populates the tweet bodies accordingly
    get_trump_json();
    get_other_json();
    tweets_refresh_animation(); //refreshes tweets to grey
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
    else {
        tweets_array = [false, true];
        return [other_tweet, trump_tweet];
    }
}


//Populates the tweets
function populate_tweets() {
    totalGuesses = 0; //Reset both these values back to 0 in case reset button was pressed
    totalCorrect = 0; 
    tweets_shown = 0;

    var trump_loc = tweet_position();
    populate_left_tweets(trump_loc[0])
    populate_right_tweets(trump_loc[1])
}


//event listener for answer buttons
document.getElementById("choice_1").addEventListener("click", choice_1_selected);
document.getElementById("choice_2").addEventListener("click", choice_2_selected);


//Functions to be called when a tweet is clicked
function choice_1_selected() {
    tweet_selected(0, 1, "left_side_tweet", "right_side_tweet"); //0 represents left side tweet
}
function choice_2_selected() {
    tweet_selected(1, 0, "right_side_tweet", "left_side_tweet"); //1 represents right side tweet
}


function tweet_selected(tweet_selected_int, not_selected_int, user_selected, not_selected) {
    is_trump_bool = tweets_array[tweet_selected_int]; // Takes in tweet 1 or 2 as int, saves bool for if its right/wrong
    console.log(is_trump_bool);
    var answer_css_array = answer_css(is_trump_bool);
    console.log(answer_css_array);

    animate_selection(tweet_selected_int, not_selected_int, user_selected, not_selected, answer_css_array);
}
function animate_selection(tweet_selected_int, not_selected_int, user_selected, not_selected, answer_css_array) {
    document.getElementById(user_selected).classList.add(answer_css_array[tweet_selected_int]); //pass the css to start the animation
    document.getElementById(not_selected).classList.add(answer_css_array[not_selected_int]);
    document.getElementById("left_tweet_content").classList.add("invisible");
    document.getElementById("right_tweet_content").classList.add("invisible");
    function change_back() { //callback function based on timer flip the css back to show the tweets 
        document.getElementById(user_selected).classList.remove(answer_css_array[tweet_selected_int]);
        document.getElementById(not_selected).classList.remove(answer_css_array[not_selected_int]);
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
    
    function change_back() { //callback function for interval to hold animation
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
    if (lettercount < 160) { //uses 160 as the current tweet catalogue has nothing above 160 chars
        var blanks_to_add = (160 - lettercount);
        blank_space += blank_space.repeat(blanks_to_add); //repeats the spaces to fill 160 chars
    }
    return (input_string + blank_space)
}