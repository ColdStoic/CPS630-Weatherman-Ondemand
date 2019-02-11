// Search bar handler.
function searchHandler() {
    //localStorage.setItem("locationName", document.getElementById("search-location").value);
    var locationName = document.getElementById("location-name").value;
    localStorage.setItem("locationName", locationName);

    var unit = document.getElementsByName("unit");
    for (var i = 0, length = unit.length; i < length; i++)
    {
        if (unit[i].checked) {
            localStorage.setItem("unit", unit[i].value);
        }
    }
    
    window.location.href = "weather.html";
}

// Upper First.
// Capitalizes the first letters of each word in a string.
function toUpperFirst(str) {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}