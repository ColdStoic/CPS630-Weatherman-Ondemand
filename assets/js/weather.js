// Global Variables.
var jsonResponse;
var fiveDayDaily = [];
var fiveDayForcast = [];
var date = new Date();

// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp = new XMLHttpRequest();
    var jsonURL = "";

    // fires when response is recieved.
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState== 4 && xmlhttp.status== 200) {
            jsonResponse = JSON.parse(xmlhttp.responseText);
            getWeather();

            console.log("Json Response", jsonResponse);
            console.log("Length", Object.keys(jsonResponse.list).length);
            console.log("Daily", fiveDayDaily);
            console.log("Forecast", fiveDayForcast);
        }
    }

    //document.getElementById("text-output").innerHTML = localStorage.getItem("location");
    var LocationId = localStorage.getItem("locationId");
    LocationId = "6167865";
    jsonURL = getApiUrl(LocationId, "metric");

    // Api call.
    xmlhttp.open("GET", jsonURL, true);
    xmlhttp.send();
});

// API Call.
function getApiUrl(id, unit) {
    return "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=" + unit + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}

// Get Weather
// Parses data for daily and forecast arrays.
function getWeather() {
    var forecast = jsonResponse.list
    var day = date.getDate()
    var forecastDaily = [];

    for (i = day; i < (day + 5); i++) {
        var dateString = "2019-02-" + (('0' + i).slice(-2));
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