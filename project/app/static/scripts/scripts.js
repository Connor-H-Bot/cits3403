/*
    Authors: Connor Harris and Kyron Milton
    Javascript file containing code to interact with the buttons and tweets on the main page
*/


//Global variables for total guesses and total answers
var totalGuesses = 0; 
var totalCorrect = 0;
var tweets_shown = 0; 
//new_tweetchoice_1[0] = year of tweet, [1] = likes, [2] = retweets, [3] = tweet content, [4] = boolean (if trump tweet it == true)
const new_tweetchoice_1 = [2016, 25636, 10223, "The media is so after me on women  Wow this is a tough business. Nobody has more respect for women than Donald Trump! ", true]
const new_tweetchoice_2 = [2010, 427913, 370242, "Sometimes I push the door close button on people running towards the elevator. I just need my own elevator sometimes. My sanctuary ", false]
const new_tweetchoice_3 = [2016, 56875, 34296, "Mark Zuckerberg I know it's your bday but can you please call me by tomorrow... We need to discuss some ideas. Money time! ", false]
const new_tweetchoice_4 = [2013, 6604, 4510, "I hope we never find life on another planet because if we do there's no doubt that the United States will start sending them money! ", true]
const answers_array = [new_tweetchoice_1[4], new_tweetchoice_2[4], new_tweetchoice_3[4], new_tweetchoice_4[4]] //answers_array[x] == true for trump tweet


//When the window loads run the populate tweets script
//window.onload = populate_tweets();                        ///remove these


//Function to be called when populating tweets
function populate_tweets() {
    totalGuesses = 0; //Reset both these values back to 0 in case reset button was pressed
    totalCorrect = 0; 
    tweets_shown = 0;
    document.getElementById("left_side_tweet").classList.add("change_guess"); //change css to flip animation
    document.getElementById("left_tweet_content").classList.add("invisible"); //make tweet content blank 
    document.getElementById("right_side_tweet").classList.add("change_guess");
    document.getElementById("right_tweet_content").classList.add("invisible");
    function change_back() { //callback function for interval to hold animation
        document.getElementById("left_side_tweet").classList.remove("change_guess"); //change it all back
        document.getElementById("left_tweet_content").classList.remove("invisible");
        document.getElementById("right_side_tweet").classList.remove("change_guess");
        document.getElementById("right_tweet_content").classList.remove("invisible");
    }
    setTimeout(change_back, 1000); //callback after 1.4 seconds
    //populate LHS values
    document.getElementById("left_tweet_likes").innerHTML = add_commas(new_tweetchoice_1[1]); //change # of likes
    document.getElementById("left_tweet_retweets").innerHTML = add_commas(new_tweetchoice_1[2]); // change # of retweets
    document.getElementById("left_tweet_body").innerHTML = extend_tweets_length(new_tweetchoice_1[3]); //change the body of the new tweet 
    document.getElementById("left_tweet_comments").innerHTML = add_commas((new_tweetchoice_1[1] - new_tweetchoice_1[2])); //comments # = (likes - retweets)
    document.getElementById("left_tweet_date").innerHTML = new_tweetchoice_1[0]; //year tweet was posted
    //do the same for RHS
    document.getElementById("right_tweet_likes").innerHTML = add_commas(new_tweetchoice_2[1]); //change # of likes
    document.getElementById("right_tweet_retweets").innerHTML = add_commas(new_tweetchoice_2[2]); // change # of retweets
    document.getElementById("right_tweet_body").innerHTML = extend_tweets_length(new_tweetchoice_2[3]); //change the body of the new tweet 
    document.getElementById("right_tweet_comments").innerHTML = add_commas((new_tweetchoice_2[1] - new_tweetchoice_2[2])); //comments # = (likes - retweets)
    document.getElementById("right_tweet_date").innerHTML = new_tweetchoice_2[0]; //year tweet was posted
    document.getElementById("score_box").innerHTML = "\"He who is redpilled is not necessarily based, just as he who is bluepilled is not necessarily cringe\" - Confucius"
}


//event listener for answer buttons
document.getElementById("choice_1").addEventListener("click", choice_1_selected);
document.getElementById("choice_2").addEventListener("click", choice_2_selected);


//Functions to be called when a tweet is clicked
function choice_1_selected() {
    tweet_selected_animation("left_side_tweet", "right_side_tweet", tweets_shown);
}
function choice_2_selected() {
    tweet_selected_animation("right_side_tweet", "left_side_tweet", (tweets_shown + 1));
}


//When the selection is made pass it into this function to animate the selected flipcard
function tweet_selected_animation(user_selection, other_tweet, tweet_number) {
    var is_trump_tweet_bool = is_trump_tweet(tweet_number); //return boolean for whether the tweet was trumps or not
    let answer_css_tostring = ""; //variable to contain the css depending on the answer
    let other_choice_css = "";
    if (is_trump_tweet_bool == true) {
        answer_css_tostring = "correct_guess";
        other_choice_css = "wrong_guess";
    }
    else {
        answer_css_tostring = "wrong_guess";
        other_choice_css = "correct_guess";
    }
    document.getElementById(user_selection).classList.add(answer_css_tostring); //pass the css to start the animation
    document.getElementById(other_tweet).classList.add(other_choice_css);
    document.getElementById("left_tweet_content").classList.add("invisible");
    document.getElementById("right_tweet_content").classList.add("invisible");
    function change_back() { //callback function based on timer flip the css back to show the tweets 
        document.getElementById(user_selection).classList.remove(answer_css_tostring);
        document.getElementById(other_tweet).classList.remove(other_choice_css);
        document.getElementById("left_tweet_content").classList.remove("invisible");
    document.getElementById("right_tweet_content").classList.remove("invisible");
    }
    setTimeout(change_back, 1400); //callback after 1.4 seconds
    tweet_selected(is_trump_tweet_bool);
}


//call image array to see if tweet is real or fake (returns boolean)
function is_trump_tweet(x) 
{ 
    is_trump_tweet_bool = answers_array[x]; 
    return is_trump_tweet_bool
}


//Checks answer and updates score + image & plays sound
function tweet_selected(is_trump_tweet_bool) 
{
    if ((is_trump_tweet_bool) == true)
    {
        totalGuesses += 1;
        totalCorrect += 1; 
        tweets_shown += 2;
        document.getElementById("score_box").innerHTML = totalCorrect + "/" + totalGuesses + ": Nice, very based";
        play_sound(true);  
    } 
        else //will only be true or false so no need to put error handling in
    {
        totalGuesses += 1;
        tweets_shown += 2;
        document.getElementById("score_box").innerHTML = totalCorrect + "/" + totalGuesses + ": Kinda sus";
        play_sound(false);
    }
    //first choice updater
    document.getElementById("left_tweet_likes").innerHTML = add_commas(new_tweetchoice_3[1]); //change # of likes
    document.getElementById("left_tweet_retweets").innerHTML = add_commas(new_tweetchoice_3[2]); // change # of retweets
    document.getElementById("left_tweet_body").innerHTML = extend_tweets_length(new_tweetchoice_3[3]); //change the body of the new tweet 
    document.getElementById("left_tweet_comments").innerHTML = add_commas((new_tweetchoice_3[1] - new_tweetchoice_3[2])); //comments # = (likes - retweets)
    document.getElementById("left_tweet_date").innerHTML = new_tweetchoice_3[0]; //change date of new tweet
    //second choice updater
    document.getElementById("right_tweet_likes").innerHTML = add_commas(new_tweetchoice_4[1]); //change # of likes
    document.getElementById("right_tweet_retweets").innerHTML = add_commas(new_tweetchoice_4[2]); // change # of retweets
    document.getElementById("right_tweet_body").innerHTML = extend_tweets_length(new_tweetchoice_4[3]); //change the body of the new tweet 
    document.getElementById("right_tweet_comments").innerHTML = add_commas((new_tweetchoice_4[1] - new_tweetchoice_4[2])); //comments # = (likes - retweets)
    document.getElementById("right_tweet_date").innerHTML = new_tweetchoice_4[0]; //change date of new tweet
}


//play sound according to whether answer was right or wrong
function play_sound(x) 
{
    var audio_true = new Audio(src="frontend/sounds/vine_boom.mp3"); //audio if answer is correct
    var audio_false = new Audio(src="frontend/sounds/wrong.mp3"); //audio if answer is false
        if (x == true)
        {
            audio_true.play();
        }
            else if (x == false)
        {
            audio_false.play();
        }
}


//Extend the length of the tweet body so that its always 150 characters (fills with blank spaces)
function extend_tweets_length(input_string) {
    var lettercount = input_string.length;
    var blank_space = '\xa0'; //\xa0 is the symbol for a blank space
    if (lettercount < 160) { //uses 160 as the current tweet catalogue has nothing above 160 chars
        var blanks_to_add = (160 - lettercount);
        blank_space += blank_space.repeat(blanks_to_add); //repeats the spaces to fill 160 chars
    }
    return (input_string + blank_space)
}


//Change integers to strings and add a comma when its above 3 figures (3000 == 3,000 & 100000 == 100,000)
function add_commas(integer) {
    var int_as_string_arr = (integer.toString()).split(""); //int becomes a string which is split accross an array
    if (int_as_string_arr.length > 3) {
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
}