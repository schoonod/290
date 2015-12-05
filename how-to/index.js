// -----App setup----- //
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});  // use 'main' and the default layout
var content = require('./content.js');
var request = require('request');
var bodyParser = require('body-parser');



var app = express();
app.engine('handlebars', handlebars.engine);        // uses handlebars as the .handlebars file handler
app.set('view engine', 'handlebars');               // allows omission of .handlebars ext when making file calls
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));                  // look for static files in how-to/public




// -----Controllers----- //
app.get('/',function(req,res){
    res.render('home', content);
});

app.get('/makePartial', function(req, res){
    res.render('makePartial', content);
});

app.get('/context', function(req, res){
    res.render('context', content);
});

//app.get('/hotswap', function(req, res){
//    res.render('hotswap', content);
//});


// Page not found
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

// Error handling; can call this via http requests with next(err)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

// Listen for requests
app.listen(app.get('port'), function(){
    console.log('Express started on port' + app.get('port') + '; press Ctrl-C to terminate.');
});
