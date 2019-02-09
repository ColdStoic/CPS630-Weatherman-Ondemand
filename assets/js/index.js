// Search bar handler.
function searchHandler() {
    //localStorage.setItem("locationName", document.getElementById("search-location").value);
    var searchLocation = document.getElementById("search-location").value;
    localStorage.setItem("locationId", getIdByLocation(searchLocation));
    window.location.href = "weather.html";
}

// Upper First.
// Capitalizes the first letters of each word in a string.
function toUpperFirst(str) {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}

// Gets slice of location from city list.
function getIdByLocation(country) {
    return cityList.filter(
        function(cityList) {
            return cityList.name == country
        }
    )[0].id;
}