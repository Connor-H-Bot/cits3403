

function pic_selected(y)
{
    if (check_img(y) = true)
    {
        document.getElementById("score").innerHTML = "1/1: Nice, very based";
        document.getElementById("real_tweet").src="frontend/images/real_tweet_reaction.png";
        play();
    } else //will only be true or false so no need to put error handling in
    {
        document.getElementById("score").innerHTML = "0/1: Kinda sus";
        document.getElementById("fake_tweet").src="frontend/images/fake_tweet_reaction.png";
        play();
    }
}

function play() //play vineboom sound effect when selecting an answer
{
var audio = new Audio("/frontend/sounds/vine_boom.mp3");
audio.play();
}

const img_array = [true, false] //boolean array containing values for each image

function check_img(x)
{ 
    return img_array[x]; //call the array and return value
}
