const img_array = [true, false] //boolean array containing values for each image

function check_img(x)
{ 
    return img_array[x]; //call the array and return value
}

function pic_selected(x)
{
    if (check_img(x) == true)
    {
        document.getElementById("score").innerHTML = "1/1: Nice, very based";
        document.getElementById("real_tweet").src="frontend/images/real_tweet_reaction.png";
        play_sound(true);
    } 
        else //will only be true or false so no need to put error handling in
    {
        document.getElementById("score").innerHTML = "0/1: Kinda sus";
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
