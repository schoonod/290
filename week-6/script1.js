// Key for Open Weather
var openWeatherAPIKey = "&APPID=9a15b6a462b0ea3645959ca4a52157f3";


// Returns either the zip code or city input from user
function getWeatherAPIParameter(){
    var zip = document.getElementsByName('zip');
    var city = document.getElementsByName('city');
    console.log(zip[0].value);
    console.log(city[0].value);
    if (zip[0].value)
        return "http://api.openweathermap.org/data/2.5/weather?zip=" + zip[0].value;
    else
        return "http://api.openweathermap.org/data/2.5/weather?q=city" + city[0].value;
}

// Appends weather results with data from http request/response
function appendWeatherResults(oCity, oTemp, oHumidity){
    (function(){
        for(var i = 0; i < 3; i++)
            document.body.appendChild(document.createElement('paragraph'));
    })();

    var paragraphs = document.getElementsByTagName('paragraph');
    var city = document.createTextNode('City: ' + oCity);
    var temp = document.createTextNode('Temp: ' + oTemp);
    var humi = document.createTextNode('Humidity: ' + oHumidity);
    paragraphs[0].appendChild(city);
    paragraphs[1].appendChild(temp);
    paragraphs[2].appendChild(humi);
}

// Asynch HTTP request
function request(event){
    var req = new XMLHttpRequest();
    var apiParam = getWeatherAPIParameter();
    console.log(apiParam + openWeatherAPIKey);

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





