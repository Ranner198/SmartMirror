let clock = document.getElementById("Clock");

function FixDate(val)
{
    if (val < 10)
        val = "0" + val;
    return val;
}

function UpdateClock()
{
    let currDate = new Date();
    let hh = FixDate(currDate.getHours());
    let mm = FixDate(currDate.getMinutes());
    let ss = FixDate(currDate.getSeconds());
    clock.innerHTML = hh + ":" + mm + ":" + ss;

    // Mood Lighting
    /*
    if (hh > 6 && hh < 22)            
        Moodlighting('#ffffff', '#00ccff');                  
    else            
        Moodlighting('#333333', '#003333');  
    */
}

setInterval(UpdateClock, 1000);