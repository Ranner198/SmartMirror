// Global Variables

const DaysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];    
const MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Greeting = document.getElementById("Greeting");
const weatherRef = document.getElementById("Weather");
var Greetings = ["Hi, how are you today?"];  

function OnPageLoaded() {

    // Call for on start
    UpdateGUI();
    DisplayGreetings();

    //Repeating methods
    setInterval(UpdateGUI, 300000);
    setInterval(NextArticle, 15000);
    setInterval(DisplayGreetings, 15000);
}

function UpdateGUI() {
    currentWeatherDisplay = [];
    Greetings = ["Hi, how are you today?"];
    GatherWeatherData();        
    GatherNewsData();
}

function DisplayGreetings()
{
    Greeting.innerHTML = Greetings[Math.floor(Math.random() * Greetings.length)];
}

function Moodlighting(textAndBorder, weatherDay)
{  
    document.documentElement.style.setProperty('--main-text-color', textAndBorder);
    document.documentElement.style.setProperty('--main-border-color', textAndBorder);
    document.documentElement.style.setProperty('--main-weatherday-color', weatherDay);
}