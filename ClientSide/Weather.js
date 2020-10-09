    // Weather Data
    function GatherWeatherData() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                weatherRef.innerHTML = this.responseText;
                Gather5DayWeatherData();
            }
        };
        xhttp.open("GET", "./Weather", true);
        xhttp.send();
    }

    // Weather Data
    function Gather5DayWeatherData() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                let temp = JSON.parse(this.responseText);
                let returnData = `<br><hr><div style="text-align:center; margin: auto; width: 100%;">`;
                for (let i = 1; i < temp.length; i++) {
                    let date = new Date(temp[i].dt * 1000);
                    returnData += `
                    <h4 style="margin: -5px auto -5px auto; background-color: var(--main-weatherday-color); width: 85%;">
                        <b>${DaysOfTheWeek[date.getDay()]}</b>
                    </h4>
                    <hr>
                        <img style="margin: -10px;" src=http://openweathermap.org/img/wn/${temp[i].weather[0].icon}.png>
                    <br>
                    <span style="display: inline; width: 25%;">
                        ${Math.round(temp[i].main.temp)}&#8457;&nbsp;${temp[i].weather[0].description}
                    </span>
                    <hr>`
                }

                let date = new Date();
                Greetings.push(`Today's Weather: ${temp[0].weather[0].main} <img style="margin: -10px;" src=http://openweathermap.org/img/wn/${temp[0].weather[0].icon}.png> ${Math.round(temp[0].main.temp_max)}&#176;/${Math.round(temp[0].main.temp_min)}&#176;`);
                Greetings.push(`Today is ${DaysOfTheWeek[date.getDay()]} ${MonthNames[date.getMonth()]}, ${String(date.getDate()).padStart(2, '0')} ${date.getFullYear()}`);

                returnData += "</div>";

                let weatherRef = document.getElementById("Weather");
                weatherRef.innerHTML += returnData;
            }
        };
        xhttp.open("GET", "./5dayforcast", true);
        xhttp.send();
    }