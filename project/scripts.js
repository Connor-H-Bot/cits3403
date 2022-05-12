/*
    Authors: Connor Harris and Kyron Milton
    Javascript file containing code to interact with landing_page.html
*/

//Global variables for total guesses and total answers
var totalGuesses = 0; 
var totalCorrect = 0; 

    //new_tweetchoice_1[0] = year of tweet, [1] = likes, [2] = retweets, [3] = tweet content, [4] = boolean (if trump tweet it == true)
const new_tweetchoice_1 = [2016, 25636, 10223, "The media is so after me on women  Wow this is a tough business. Nobody has more respect for women than Donald Trump!", true]
const new_tweetchoice_2 = [2010, 427913, 370242, "Sometimes I push the door close button on people running towards the elevator. I just need my own elevator sometimes. My sanctuary", false]
const new_tweetchoice_3 = [2016, 56875, 34296, "Mark Zuckerberg I know it's your bday but can you please call me by tomorrow... We need to discuss some ideas. Money time!", false]
const new_tweetchoice_4 = [2013, 6604, 4510, "I hope we never find life on another planet because if we do there's no doubt that the United States will start sending them money!", true]
const answers_array = [new_tweetchoice_1[4], new_tweetchoice_2[4], new_tweetchoice_3[4], new_tweetchoice_4[4]] //answers_array[x] == true for trump tweet

//When the window loads run the populate tweets script
window.onload = populate_tweets(); 

//event listener
//document.getElementById("choice_1").addEventListener("click", tweet_selected);

//Function to be called when populating tweets
function populate_tweets() {
    totalGuesses = 0; //Reset both these values back to 0 in case reset button was pressed
    totalCorrect = 0; 
    //populate LHS values
    document.getElementById("left_tweet_likes").innerHTML = new_tweetchoice_1[1]; //change # of likes
    document.getElementById("left_tweet_retweets").innerHTML = new_tweetchoice_1[2]; // change # of retweets
    document.getElementById("left_tweet_body").innerHTML = new_tweetchoice_1[3]; //change the body of the new tweet 
    document.getElementById("left_tweet_comments").innerHTML = (new_tweetchoice_1[1] - new_tweetchoice_1[2]); //comments # = (likes - retweets)
    document.getElementById("left_tweet_date").innerHTML = new_tweetchoice_1[0];
    //do the same for RHS
    document.getElementById("right_tweet_likes").innerHTML = new_tweetchoice_2[1]; //change # of likes
    document.getElementById("right_tweet_retweets").innerHTML = new_tweetchoice_2[2]; // change # of retweets
    document.getElementById("right_tweet_body").innerHTML = new_tweetchoice_2[3]; //change the body of the new tweet 
    document.getElementById("right_tweet_comments").innerHTML = (new_tweetchoice_2[1] - new_tweetchoice_2[2]); //comments # = (likes - retweets)
    document.getElementById("right_tweet_date").innerHTML = new_tweetchoice_2[0];
    document.getElementById("score_box").innerHTML = "\"He who is redpilled is not necessarily based, just as he who is bluepilled is not necessarily cringe\" - Confucius"
}

//call image array to see if tweet is real or fake (returns boolean)
function is_trump_tweet(x) 
{ 
    return answers_array[x]; 
}

//Checks answer and updates score + image & plays sound
function tweet_selected(x) 
{
    if (is_trump_tweet(x) == true)
    {
        totalGuesses += 1;
        totalCorrect += 1; 
        document.getElementById("score_box").innerHTML = totalCorrect + "/" + totalGuesses + ": Nice, very based";
        document.getElementById("left_tweet_likes").innerHTML = new_tweetchoice_3[1]; //change # of likes
        document.getElementById("left_tweet_retweets").innerHTML = new_tweetchoice_3[2]; // change # of retweets
        document.getElementById("left_tweet_body").innerHTML = new_tweetchoice_3[3]; //change the body of the new tweet 
        document.getElementById("left_tweet_comments").innerHTML = (new_tweetchoice_3[1] - new_tweetchoice_3[2]); //comments # = (likes - retweets)
        document.getElementById("left_tweet_date").innerHTML = new_tweetchoice_3[0];
        play_sound(true);  
    } 
        else //will only be true or false so no need to put error handling in
    {
        totalGuesses += 1;
        document.getElementById("score_box").innerHTML = totalCorrect + "/" + totalGuesses + ": Kinda sus";
        document.getElementById("right_tweet_likes").innerHTML = new_tweetchoice_4[1]; //change # of likes
        document.getElementById("right_tweet_retweets").innerHTML = new_tweetchoice_4[2]; // change # of retweets
        document.getElementById("right_tweet_body").innerHTML = new_tweetchoice_4[3]; //change the body of the new tweet 
        document.getElementById("right_tweet_comments").innerHTML = (new_tweetchoice_4[1] - new_tweetchoice_4[2]); //comments # = (likes - retweets)
        document.getElementById("right_tweet_date").innerHTML = new_tweetchoice_4[0];
        play_sound(false);
    }
}

function play_sound(x) //play sound according to whether answer was right or wrong
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
