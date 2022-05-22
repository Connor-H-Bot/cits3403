/*
    Authors: Connor Harris and Kyron Milton
    Javascript file to load user statistics and paste them into stats bar
*/

var stats_as_json = {};

window.onload = update_stats();

function update_stats() {
    //retrieve stats as JSON
    get_stats();
    populate_stat_values();
}

function get_stats() {
    //something about authenticating user
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "http://127.0.0.1:5000/api/get_stats", false);
    xhReq.send(null);
    stats_as_json = JSON.parse(xhReq.responseText);
}

function populate_stat_values() { 
    document.getElementById("timesPlayed").innerHTML = stats_as_json.timesPlayed;   //Update total games played
    document.getElementById("numWins").innerHTML = stats_as_json.numWins;           //update total wins
    document.getElementById("currStreak").innerHTML = stats_as_json.currentWinStrk; //Current streak (wins in a row)
    document.getElementById("highestStreak").innerHTML = stats_as_json.highestWinStrk;  //Highest streak
    document.getElementById("winRate").innerHTML = parseInt((stats_as_json.numWins / stats_as_json.timesPlayed) * 100);           //Win rate as %
}