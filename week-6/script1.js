// Key for Open Weather
var openWeatherAPIKey = "&APPID=9a15b6a462b0ea3645959ca4a52157f3";


// Returns either the zip code or city input from user
function getWeatherAPIParameter(){
    var loc = document.getElementById('loc').value;
    if (isNaN(loc)) {
        return "http://api.openweathermap.org/data/2.5/weather?q=city" + loc + "&units=imperial";
    }
    else {
        return "http://api.openweathermap.org/data/2.5/weather?zip=" + loc  + "&units=imperial";
    }

}

// Appends weather results with data from http request/response
function appendWeatherResults(oCity, oTemp, oHumidity){
    var city = document.getElementById("city");
    var temp = document.getElementById("temp");
    var humi = document.getElementById("humi");
    city.textContent = "City: " + oCity;
    temp.textContent = "Temp: " + oTemp;
    humi.textContent = "Humidity: " + oHumidity;
}

// Asynch HTTP request
function request(event){
    var req = new XMLHttpRequest();
    var apiParam = getWeatherAPIParameter();
    req.open('GET', apiParam + openWeatherAPIKey, true);
    req.addEventListener('load',function(event){
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            appendWeatherResults(response.name, response.main.temp, response.main.humidity);
        }
        else
            console.log("Error in network request: " + request.statusText);
    });
    req.send(null);
    event.preventDefault();
}

// Add http request to form submit event
document.getElementById('submit').addEventListener('click', request);





