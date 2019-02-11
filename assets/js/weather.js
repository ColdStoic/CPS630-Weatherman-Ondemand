// Global Variables.
var jsonForecast = null;
var jsonWeather = null;
var fiveDayDaily = [];
var fiveDayForcast = [];

var date = new Date();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

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
    var LocationName = localStorage.getItem("locationName");
    LocationName = "Toronto, Ca";
    jsonURL = getWeatherApiUrl(LocationName, "metric");
    
    // Api call.
    xmlhttp1.open("GET", jsonURL, true);
    xmlhttp1.send();

    jsonURL = getForecastApiUrl(LocationName, "metric");
    
    // Api call.
    xmlhttp2.open("GET", jsonURL, true);
    xmlhttp2.send();
});

// API Calls.
function getForecastApiUrl(name, unit) {
    return "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&units=" + unit + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}
function getWeatherApiUrl(name, unit) {
    return "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=" + unit + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}
function onCallsReady() {
    getWeather();
    setDailyDays();
    setWeather(0);

    console.log("Json Weather", jsonWeather);
    console.log("Json Forecast", jsonForecast);

    console.log("Length", Object.keys(jsonForecast.list).length);
    console.log("Daily", fiveDayDaily);
    console.log("Forecast", fiveDayForcast);
}

function setDailyDays() {
    /* Daily Main Info */
    var dailyDays = document.getElementsByClassName("daily-days");

    dailyDays[0].getElementsByClassName("daily-day")[0].innerHTML = getWeekday(jsonWeather.dt);
    dailyDays[0].getElementsByClassName("daily-day-icon")[0].innerHTML = '<i class="wi ' + getWeatherIcon(jsonWeather.weather[0].id)  + '"></i>';
    dailyDays[0].getElementsByClassName("daily-day-temp-low")[0].innerHTML = jsonWeather.main.temp_min;
    dailyDays[0].getElementsByClassName("daily-day-temp-high")[0].innerHTML = jsonWeather.main.temp_max;
    for(i = 1; i < dailyDays.length; i++) {
        dailyDays[i].getElementsByClassName("daily-day")[0].innerHTML = getWeekday(fiveDayDaily[i].dt);
        dailyDays[i].getElementsByClassName("daily-day-icon")[0].innerHTML = '<i class="wi ' + getWeatherIcon(fiveDayDaily[i].weather[0].id)  + '"></i>';
        dailyDays[i].getElementsByClassName("daily-day-temp-low")[0].innerHTML = fiveDayDaily[i].main.temp_min;
        dailyDays[i].getElementsByClassName("daily-day-temp-high")[0].innerHTML = fiveDayDaily[i].main.temp_max;
    }
}

// Get Weather
// Parses data for daily and forecast arrays.
function getWeather() {
    var forecast = jsonForecast.list
    var day = date.getDate()

    for (i = day; i < (day + 5); i++) {
        fiveDayDaily.push(forecast.filter(
            function(forecast) {
                return (getDate(forecast.dt) == i)
            }
        )[0]);
        
        fiveDayForcast.push(forecast.filter(
            function(forecast) {
                return (getDate(forecast.dt) == i)
            }
        ));
    }
}

function getDateString(timestamp) {
    var dateObj = new Date(timestamp*1000)
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    var day = dateObj.getDate();
    var month = months[dateObj.getMonth()];
    var year = dateObj.getFullYear();

    var dateString = day + " " + month + ", " + year;
    return dateString
}

function getWeekday(timestamp) {
    var dateObj = new Date(timestamp*1000)
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    var day = days[dateObj.getDay()];

    return day
}

function getDate(timestamp) {
    var dateObj = new Date(timestamp*1000)
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    var date = dateObj.getDate();

    return date
}

function getTime(timestamp) {
    var dateObj = new Date(timestamp*1000)
    dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 );
    var hour = dateObj.getHours();

    return hour
}

// Upper First.
// Capitalizes the first letters of each word in a string.
function toUpperFirst(str) {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

function getWeatherIcon(id) {
    switch(id.toString()[0]) {
        case "2":
            return "wi-thunderstorm";
        case "3":
            return "wi-showers";
        case "5":
            return "wi-rain";
        case "6":
            return "wi-snow";
        case "7":
            return "wi-fog";
        case "8":
            if (id == 801 || id == 802 || id == 803 || id == 804) {
                return "wi-cloudy" 
            } else {
                return "wi-day-sunny";
            }
        default:
            return "";
    } 
}

function setWeather(day) {
    if (day == 0) {
        /* Daily Main */
        document.getElementById("daily-location").innerHTML = jsonWeather.name;
        document.getElementById("daily-icon").innerHTML = '<i id="daily-icon" class="wi ' + getWeatherIcon(jsonWeather.weather[0].id)  + '"></i>';
        document.getElementById("daily-temp").innerHTML = jsonWeather.main.temp + '°C';
        document.getElementById("daily-desc").innerHTML = toUpperFirst(jsonWeather.weather[0].description);
        document.getElementById("daily-date").innerHTML = getDateString(jsonWeather.dt);

        /* Hour Panels */
        var hourPanels = document.getElementsByClassName("hour-panel");
        for(i = 0; i < 8; i++) {
            if (fiveDayForcast[2][i]) {
                hourPanels[i].style.display = "flex";
                hourPanels[i].getElementsByClassName("hour-panel-time")[0].innerHTML = getTime(fiveDayForcast[2][i].dt) + ":00";
                hourPanels[i].getElementsByClassName("hour-panel-icon")[0].innerHTML = '<i class="wi ' + getWeatherIcon(fiveDayForcast[2][i].weather[0].id) + '"></i>';
                hourPanels[i].getElementsByClassName("hour-panel-desc")[0].innerHTML = fiveDayForcast[2][i].weather[0].description;
                hourPanels[i].getElementsByClassName("hour-panel-temp")[0].innerHTML = fiveDayForcast[2][i].main.temp + '°C';
            } else {
                hourPanels[i].style.display = "none";
            }
        }

        /* Panels */
        document.getElementById("panel-clouds").innerHTML = jsonWeather.clouds.all;
        if (jsonWeather.hasOwnProperty('rain')) {
            document.getElementById("panel-rain").innerHTML = jsonWeather.rain.myObject["1h"] + "mm";
        } else {
            document.getElementById("panel-rain").innerHTML = "0mm"
        }
        if (jsonWeather.hasOwnProperty('snow')) {  
            document.getElementById("panel-snow").innerHTML = jsonWeather.snow.myObject["1h"] + "mm";
        } else {
            document.getElementById("panel-snow").innerHTML = "0mm"
        }
        document.getElementById("panel-wind-speed").innerHTML = jsonWeather.wind.speed + "m/s";
        document.getElementById("panel-wind-dir").innerHTML = jsonWeather.wind.deg + "°";
        document.getElementById("panel-pressure").innerHTML = jsonWeather.main.pressure + "hPa";
        document.getElementById("panel-humidity").innerHTML = jsonWeather.main.humidity + "%";
    } else {
        /* Daily Main */
        /* document.getElementById("daily-location").innerHTML = jsonWeather.name; */
        document.getElementById("daily-icon").innerHTML = '<i id="daily-icon" class="wi ' + getWeatherIcon(jsonWeather.weather[0].id)  + '"></i>';
        document.getElementById("daily-temp").innerHTML = fiveDayForcast[day][0].main.temp + '°C';
        document.getElementById("daily-desc").innerHTML = toUpperFirst(fiveDayForcast[day][0].weather[0].description);
        document.getElementById("daily-date").innerHTML = getDateString(fiveDayForcast[day][0].dt);

        /* Hour Panels */
        var hourPanels = document.getElementsByClassName("hour-panel");
        for(i = 0; i < 8; i++) {
            if (fiveDayForcast[day][i]) {
                hourPanels[i].style.display = "flex";
                hourPanels[i].getElementsByClassName("hour-panel-time")[0].innerHTML = getTime(fiveDayForcast[day][i].dt) + ":00";
                hourPanels[i].getElementsByClassName("hour-panel-icon")[0].innerHTML = '<i class="wi ' + getWeatherIcon(fiveDayForcast[2][i].weather[0].id) + '"></i>';
                hourPanels[i].getElementsByClassName("hour-panel-desc")[0].innerHTML = fiveDayForcast[day][i].weather[0].description;
                hourPanels[i].getElementsByClassName("hour-panel-temp")[0].innerHTML = fiveDayForcast[day][i].main.temp + '°C';
            } else {
                hourPanels[i].style.display = "none";
            }
        }

        /* Panels */
        document.getElementById("panel-clouds").innerHTML = fiveDayForcast[day][0].clouds.all;
        if (fiveDayForcast[day][0].hasOwnProperty('rain')) {
            document.getElementById("panel-rain").innerHTML = fiveDayForcast[day][0].rain["3h"] + "mm";
        } else {
            document.getElementById("panel-rain").innerHTML = "0mm"
        }
        if (fiveDayForcast[day][0].hasOwnProperty('snow')) {
            document.getElementById("panel-snow").innerHTML = fiveDayForcast[day][0].snow["3h"] + "mm";
        } else {
            document.getElementById("panel-snow").innerHTML = "0mm"
        }
        document.getElementById("panel-wind-speed").innerHTML = fiveDayForcast[day][0].wind.speed + "m/s";
        document.getElementById("panel-wind-dir").innerHTML = fiveDayForcast[day][0].wind.deg + "°";
        document.getElementById("panel-pressure").innerHTML = fiveDayForcast[day][0].main.pressure + "hPa";
        document.getElementById("panel-humidity").innerHTML = fiveDayForcast[day][0].main.humidity + "%";
    }
}