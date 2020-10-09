const express = require('express');
const { request } = require('express');
const requestHttp = require('request');

const fs = require('fs');
var creds;
fs.readFile('./creds.json', 'utf8', (err, data) => {
    if (err) throw err;
    creds = JSON.parse(data);
});

const app = express();
const http = require('http');
const https = require('https');
const cheerio = require('cheerio');
const NewsAPI = require('newsapi');
const { count } = require('console');
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, "/ClientSide")));
app.get('/', (req, res) => res.sendFile(__dirname + "./ClientSide/index.html"));

app.get('/Meme', (req, res) => {

    requestHttp('https://www.reddit.com/r/dankmemes/', function(err, resp, html) {
        setTimeout(() => {DelayWebrequest(html, err)}, 9000);
    });
    function DelayWebrequest(html, err) {
         //If there is no error
         if (!err){
            //The URL Data
            const $ = cheerio.load(html);

            //Save embeded urls
            var returnInfo = [];

            //Treverse the webpage and select the media elements
            $('.media-element').each(function(i, element){
                var temp = $(this).attr('src'); //Create a reference for the image
                console.log(temp);
                returnInfo.push(temp); //Add the URL address to the return info array
            }); 

            //Generate a random number from the length of the returned image urls
            var randomNum = Math.floor(rand(0, returnInfo.length));
            console.log(randomNum + "/" + returnInfo.length);

            //Try to output the url, if it doesn't exist or there is a problem it will log it out for us
            try {
            //Output the url for the image you can embed this somewhere and it will show it
                console.log(returnInfo[randomNum]);
                return res.send(returnInfo[randomNum]);
            } 
            catch(e) {
                //Output the error
                console.log("Error in the output process: " + e);
                return res.send(e);
            }
        } 
        else {
            //There was an error with our request
            console.log("Error in webscrape process: " + err);
            return res.send(err);
        }
    }
});

app.get('/Weather', (req, res) => {
    http.get(`http://api.openweathermap.org/data/2.5/weather?q=huntsville&units=imperial&appid=${creds.OpenWeatherAPI}`, (resp) => {
        let data = '';      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          let json = JSON.parse(data);
          res.send(`
            <div style="text-align:center; margin: auto; width: 100%;">
                <h3 style="margin: auto; background-color: var(--main-weatherday-color); width: 85%;">Current Weather:</h3>
                <hr>
                <h2 style="margin: 0px;">${json.weather[0].main}</h2>
                <img style="margin: -5px;" src="http://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png">
                <h3 style="margin: 0px;">${Math.round(json.main.temp)}&#8457;</h3>
                <h3 style="margin: 5px;">${json.weather[0].description}</h3>
            </div>`);
        });      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send(err.message);
    });
});

app.get('/5dayforcast', (req, res) => {
    http.get(`http://api.openweathermap.org/data/2.5/forecast?q=huntsville&units=imperial&appid=${creds.OpenWeatherAPI}`, (resp) => {
        let data = '';      
        let delimitorFactor = req.query.delimitor || 8;
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let json = JSON.parse(data);
            let cleanJSON = [];

            let counter = 0;

            for (let i = 0; i < json.list.length; i++) {                
                if (i%delimitorFactor== 0)
                {
                    cleanJSON.push(json.list[i]);
                }
            }

            res.send(cleanJSON);
        });      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send(err.message);
    });
});

app.get('/dailyforcast', (req, res) => {
    http.get(`http://api.openweathermap.org/data/2.5/forecast?q=huntsville&units=imperial&appid=${creds.OpenWeatherAPI}&cnt=6`, (resp) => {
        let data = '';              
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            let json = JSON.parse(data);
            let cleanJSON = [];

            for (let i = 0; i < json.cnt; i++) {                
                cleanJSON.push(json.list[i]);
            }

            res.send(cleanJSON);
        });      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send(err.message);
    });
});

app.get('/News', (req, res) => {
    let newsapi = new NewsAPI(creds.NewsAPI);
    newsapi.v2.topHeadlines({
        category: 'technology',
        language: 'en',
        country: 'us'
      }).then(response => {
        res.send(response);
      });    
});

//9bc4c8c6a0a34fa6b75661415730afd1
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

function rand(min, max){
    return (Math.floor(Math.pow(10,14)*Math.random()*Math.random())%(max-min+1))+min;
}