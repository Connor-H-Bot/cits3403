//JS file to reset the current game state

//post request to store current game and add to statistics.
//if all tries are not used they are counted as fails. 

document.getElementById("resetButton").addEventListener("click", refresh_Page);

function refresh_Page(){
    populate_tweets();
}

//function to rotate icon
$(".rotate").click(function(){
    $(this).toggleClass("down")  ; 
   })