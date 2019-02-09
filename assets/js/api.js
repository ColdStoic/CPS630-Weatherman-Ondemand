// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp = new XMLHttpRequest();
    var jsonURL = "";
    var jsonResponse;
    var d = new Date();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState== 4 && xmlhttp.status== 200) {
            jsonResponse = JSON.parse(xmlhttp.responseText);
            printConsole(jsonResponse);

            console.log(Object.keys( jsonResponse.list ).length);
            console.log(getFirstDay(d.getDate(), jsonResponse.list));
        }
    }

    var ID = getSliceByLocation("Toronto").id;
    jsonURL = getApiUrl(ID);
    xmlhttp.open("GET", jsonURL, true);
    xmlhttp.send();
});

// Print text to console.
function printConsole(text) {
    console.log(text);
}

// Search bar handler.
function searchHandler() {
    var x = document.getElementById("search-input").value;
    document.getElementById("text-output").innerHTML = x;
}

function getSliceByLocation(country) {
    return cityList.filter(
        function(cityList) {
            return cityList.name == country
        }
    )[0];
}

function toUpperFirst(str) {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

function getApiUrl(id) {
    return "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&units=metric&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}

function getFirstDay(day, forecast) {
    var forecastDaily = [];

    for(i = day; i < (day + 5); i++) {
        var dayinc = "2019-02-" + (('0' + i).slice(-2));
        console.log(dayinc);
        forecastDaily.push(forecast.filter(
                function(forecast) {
                    return forecast.dt_txt.includes(dayinc)
                }
            )[0]
        );
    }

    return forecastDaily;
}