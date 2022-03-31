const img_array = [true, false] //boolean array containing values for each image
let totalGuesses = 0 //Variable int to keep track of total answers
let totalCorrect = 0 //Variable int to keep track of correct answers

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
        document.getElementById("score").innerHTML = totalCorrect + "/1: Nice, very based";
        document.getElementById("real_tweet").src="frontend/images/real_tweet_reaction.png";
        play_sound(true);
    } 
        else //will only be true or false so no need to put error handling in
    {
        totalGuesses += 1;
        document.getElementById("score").innerHTML = totalCorrect + "/1: Kinda sus";
        document.getElementById("fake_tweet").src="frontend/images/fake_tweet_reaction.png";
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
