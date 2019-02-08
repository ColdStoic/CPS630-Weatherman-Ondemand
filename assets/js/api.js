// Onload.
document.addEventListener("DOMContentLoaded", function(event) {
    var xmlhttp = new XMLHttpRequest();
    var jsonURL = "https://jsonplaceholder.typicode.com/todos/1";
    var jsonResponse;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState== 4 && xmlhttp.status== 200) {
            jsonResponse = xmlhttp.responseText;
            printConsole(jsonResponse);
        }
    }

    xmlhttp.open("GET", jsonURL, true);
    xmlhttp.send();
});

// Print text to console.
function printConsole(text) {
    console.log(text)
}

// Search bar handler.
function searchHandler() {
    var x = document.getElementById("search-input").value;
    document.getElementById("text-output").innerHTML = x;
}