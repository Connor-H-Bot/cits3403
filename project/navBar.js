// This will be the main JS to control the event listeners attached to each navigation bar button

// If Button pressed change display from flex to none and vice versa for the page to be displayed 

// if leaderboards seleceted creates modal in the midal of the screen 

// this java script will also handles eventlisteners for if the close button on the two pages is selected
// returning back to the main page of the game 

//this will not handle the reset game feature as it should be contained in its own JS function and POST statistics to be stored on web server.
document.getElementById("helpB").addEventListener("click", setHelpPageON);
document.getElementById("settingB").addEventListener("click", setSettingPageON);

function setHelpPageON(){
    document.getElementById('mainScreen').classList.replace('Game', 'hidden');
    document.getElementById('headerSelect').classList.add('hidden');
    document.getElementById('helpScreen').classList.replace('helpScreenOFF','helpScreenON');
}

function setSettingPageON(){
    document.getElementById('mainScreen').classList.replace('Game', 'hidden');
    document.getElementById('headerSelect').classList.add('hidden');
    document.getElementById('settingsScreen').classList.replace('settingsScreenOFF','settingsScreenON');
}
