// Global Variables.
var jsonForecast;
var jsonWeather;
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
            console.log("Json Weather", jsonWeather);

            document.getElementById("daily-location").innerHTML = jsonWeather.name;
            document.getElementById("daily-temperature").innerHTML = jsonWeather.main.temp;
            document.getElementById("daily-date").innerHTML = date.getUTCDate();
        }
    }

    // fires when response is recieved.
    xmlhttp2.onreadystatechange = function() {
        if (xmlhttp2.readyState== 4 && xmlhttp2.status== 200) {
            jsonForecast = JSON.parse(xmlhttp2.responseText);
            console.log("Json Forecast", jsonForecast);

            getWeather();
            setDaily();
            
            console.log("Length", Object.keys(jsonForecast.list).length);
            console.log("Daily", fiveDayDaily);
            console.log("Forecast", fiveDayForcast);
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

// Get Weather
// Parses data for daily and forecast arrays.
function getWeather() {
    var forecast = jsonForecast.list
    var day = date.getDate()
    var forecastDaily = [];

    for (i = day; i < (day + 5); i++) {
        var dateString = "2019-02-" + (('0' + i).slice(-2));
        //console.log(dateString);
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
    console.log("Daily Days: ", dailyDays);

    for(i = 1; i < dailyDays.length; i++) {
        dailyDays[i].innerHTML = i;
    }
}