// Global Variables.
var jsonForecast = null;
var jsonWeather = null;
var fiveDayDaily = [];
var fiveDayForcast = [];
var date = new Date();

// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp1 = new XMLHttpRequest();
    var xmlhttp2 = new XMLHttpRequest();
    var jsonURL = "";

    // fires when response is recieved.
    xmlhttp1.onreadystatechange = function() {
        if (xmlhttp1.readyState== 4 && xmlhttp1.status== 200) {
            jsonWeather = JSON.parse(xmlhttp1.responseText);

            if (jsonForecast != null) {
                onCallsReady();
            }
        }
    }

    // fires when response is recieved.
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState== 4 && xmlhttp2.status== 200) {
            jsonForecast = JSON.parse(xmlhttp2.responseText);

            if (jsonWeather != null) {
                onCallsReady();
            }
        }  
    }

    //document.getElementById("text-output").innerHTML = localStorage.getItem("location");
    var LocationId = localStorage.getItem("locationId");
    LocationId = "6167865";
    jsonURL = getWeatherApiUrl(LocationId, "metric");
    
    // Api call.
    xmlhttp1.open("GET", jsonURL, true);
    xmlhttp1.send();

    jsonURL = getForecastApiUrl(LocationId, "metric");
    
    // Api call.
    xmlhttp2.open("GET", jsonURL, true);
    xmlhttp2.send();
});

// API Calls.
function getForecastApiUrl(id, unit) {
    return "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=" + unit + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}
function getWeatherApiUrl(id, unit) {
    return "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&units=" + unit + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}
function onCallsReady() {
    getWeather();
    setDaily();
    
    document.getElementById("daily-location").innerHTML = jsonWeather.name;
    document.getElementById("daily-temperature").innerHTML = jsonWeather.main.temp;
    document.getElementById("daily-date").innerHTML = date.getUTCDate();

    console.log("Json Weather", jsonWeather);
    console.log("Json Forecast", jsonForecast);

    console.log("Length", Object.keys(jsonForecast.list).length);
    console.log("Daily", fiveDayDaily);
    console.log("Forecast", fiveDayForcast);
}

// Get Weather
// Parses data for daily and forecast arrays.
function getWeather() {
    var forecast = jsonForecast.list
    var day = date.getDate()

    for (i = day; i < (day + 5); i++) {
        var dateString = "2019-02-" + (('0' + i).slice(-2));
        // console.log(dateString);
        fiveDayDaily.push(forecast.filter(
            function(forecast) {
                return forecast.dt_txt.includes(dateString)
            }
        )[0]);
        
        fiveDayForcast.push(forecast.filter(
            function(forecast) {
                return forecast.dt_txt.includes(dateString)
            }
        ));
    }
}

function setDaily() {
    var dailyDays = document.getElementsByClassName("daily-days");

    dailyDays[0].getElementsByClassName("daily-day")[0].innerHTML = jsonWeather.dt;
    dailyDays[0].getElementsByClassName("daily-day-temp-low")[0].innerHTML = jsonWeather.main.temp_min;
    dailyDays[0].getElementsByClassName("daily-day-temp-high")[0].innerHTML = jsonWeather.main.temp_max;

    for(i = 1; i < dailyDays.length; i++) {
        dailyDays[i].getElementsByClassName("daily-day")[0].innerHTML = fiveDayDaily[i].dt;
        // document.getElementById("MyElement").classList.add('MyClass');
        dailyDays[i].getElementsByClassName("daily-day-temp-low")[0].innerHTML = fiveDayDaily[i].main.temp_min;
        dailyDays[i].getElementsByClassName("daily-day-temp-high")[0].innerHTML = fiveDayDaily[i].main.temp_max;
    }
}