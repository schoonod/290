// -----App setup----- //
var express = require('express');
var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});  // use 'main' and the default layout
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(session({
    secret:'SuperSecretPassword',
    saveUninitialized: true,
    resave: true
    }));   // secret is an options object
app.engine('handlebars', handlebars.engine);        // uses handlebars as the .handlebars file handler
app.set('view engine', 'handlebars');               // allows omission of .handlebars ext when making file calls
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));                  // look for static files in week-8/public


// -----Controllers----- //
app.get('/',function(req,res,next){
    var context = {};
    //If there is no session, go to the main page.
    if(!req.session.name){
        context.DNE = "Your session does not exist, let's make that for you!";
        res.render('newSession', context);
        return;
    }

    // A session exists and that session can be used to render a view with its information, etc.
    context.name = req.session.name;
    context.toVisitCount = req.session.toVisit.length || 0;
    context.toVisit = req.session.toVisit || [];
    console.log(context.toVisit);
    res.render('toVisit',context);
});

app.post('/',function(req,res){
    var context = {};

    // A new session would render toVisit.handlebars, which would return a body
    // parameter of 'New List' after the user submits form
    if(req.body['New List']){
        req.session.name = req.body.username;
        req.session.toVisit = [];
        req.session.curId = 0;
    }

    // Catches user if they submit an empty submit box and no session exists
    if(!req.session.name){
        context.DNE = "Please enter your name.";
        res.render('newSession', context);
        return;
    }


    // If they click the 'Add Location' button
    // MAPS API probably goes here
    if(req.body['Add Location']){
        req.session.toVisit.push({"name":req.body.name, "id":req.session.curId});
        req.session.curId++;
    }

    // If they click the 'Mark as Visited' button
    if(req.body['Visited']){
        req.session.toVisit = req.session.toVisit.filter(function(e){
            return e.id != req.body.id;
        })
    }

    // If there is a session but the box is empty?
    context.name = req.session.name;
    context.toVisitCount = req.session.toVisit.length;
    context.toVisit = req.session.toVisit;
    console.log(context.toVisit);
    res.render('toVisit',context);
});

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
