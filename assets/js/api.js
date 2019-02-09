// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp = new XMLHttpRequest();
    var jsonURL = "";
    var jsonResponse;
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState== 4 && xmlhttp.status== 200) {
            jsonResponse = xmlhttp.responseText;
            printConsole(jsonResponse);
        }
    }

    var ID = getSliceByLocation("Toronto").id;
    jsonURL = getApiUrl(ID);
    console.log(jsonURL);

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
    return "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&APPID=4c06bfe661f0b300a0f60bc62534ad7d";
}