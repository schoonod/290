// Appends input results with data from http request/response
function appendInput(feedback){
    var input = document.getElementById("feedback");
    input.textContent = feedback;
}

// Asynch HTTP request
function request(event){
    var req = new XMLHttpRequest();
    var payload = {input:null};
    payload.input = document.getElementById("input").value;
    req.open('POST', 'http://httpbin.org/post', true);
    req.addEventListener('load',function(event){
        if(req.status >= 200 && req.status < 400) {
            // The response object contains the stringified version of what we sent; parse to retrieve the object
            var response = JSON.parse(req.responseText);
            var stringParse = JSON.parse(response.data);
            appendInput(stringParse.input);
            console.log(stringParse.input);
        }
        else
            console.log("Error in network request: " + request.statusText);
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Add http request to form submit event
document.getElementById('submit').addEventListener('click', request);





