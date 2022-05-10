const img_array = [true, false] //boolean array containing values for each image
let totalGuesses = 0 //Variable int to keep track of total answers
let totalCorrect = 0 //Variable int to keep track of correct answers
//new_tweetchoice_1[0] = Epoch date of tweet, [1] = likes, [2] = retweets, [3] = tweet content
const new_tweetchoice_1 = [2016, 25636, 10223, "The media is so after me on women  Wow this is a tough business. Nobody has more respect for women than Donald Trump!"]


function check_img(x) //call image array to see if tweet is real or fake (returns boolean)
{ 
    return img_array[x]; 
}

function pic_selected(x) //Checks answer and updates score + image & plays sound
{
    if (check_img(x) == true)
    {
        totalGuesses += 1;
        totalCorrect += 1; 
        document.getElementById("score_box").innerHTML = totalCorrect + "/" + totalGuesses + ": Nice, very based";
        document.getElementById("left_tweet_likes").innerHTML = new_tweetchoice_1[1]; //change # of likes
        document.getElementById("left_tweet_retweets").innerHTML = new_tweetchoice_1[2]; // change # of retweets
        document.getElementById("left_tweet_body").innerHTML = new_tweetchoice_1[3]; //change the body of the new tweet 
        document.getElementById("left_tweet_comments").innerHTML = (new_tweetchoice_1[1] - new_tweetchoice_1[2]); //comments # = (likes - retweets)
        document.getElementById("left_tweet_date").innerHTML = new_tweetchoice_1[0];
        play_sound(true);  
    } 
        else //will only be true or false so no need to put error handling in
    {
        totalGuesses += 1;
        document.getElementById("score").innerHTML = totalCorrect + "/" + totalGuesses + ": Kinda sus";
        document.getElementById("right-tweet-body").innerHTML = "Sometimes I push the door close button on people running towards the elevator. I just need my own elevator sometimes. My sanctuary";
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