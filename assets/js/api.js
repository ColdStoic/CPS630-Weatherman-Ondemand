// Global Variables.
var jsonResponse;
var d = new Date();

// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp = new XMLHttpRequest();
    var jsonURL = "";

    // fires when response is recieved.
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState== 4 && xmlhttp.status== 200) {
            jsonResponse = JSON.parse(xmlhttp.responseText);
            console.log(jsonResponse);

            console.log(Object.keys(jsonResponse.list).length);
            console.log(getFiveDayDaily());
        }
    }

    var ID = getSliceByLocation("Toronto").id;
    jsonURL = getApiUrl(ID);

    xmlhttp.open("GET", jsonURL, true);
    xmlhttp.send();
});

// Search bar handler.
function searchHandler() {
    var x = document.getElementById("search-input").value;
    document.getElementById("text-output").innerHTML = x;
}

// Gets slice of location from city list.
function getSliceByLocation(country) {
    return cityList.filter(
        function(cityList) {
            return cityList.name == country
        }
    )[0];
}

// Upper First.
// Capitalizes the first letters of each word in a string.
function toUpperFirst(str) {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

function getApiUrl(id) {
    return "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=metric" + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}

// Five Day Daily
// Gets an array with a single slice for each day.
function getFiveDayDaily() {
    var forecast = jsonResponse.list
    var day = d.getDate()
    var forecastDaily = [];

    for (i = day; i < (day + 5); i++) {
        var dateString = "2019-02-" + (('0' + i).slice(-2));
        forecastDaily.push(forecast.filter(
                function(forecast) {
                    return forecast.dt_txt.includes(dateString)
                }
            )[0]
        );
    }
    return forecastDaily;
}