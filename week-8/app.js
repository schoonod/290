// -----App setup----- //
var express = require('express');
var session = require('express-session');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});  // use 'main' and the default layout
var bodyParser = require('body-parser');
var app = express();
app.use(session({secret:'SuperSecretPassword'}));   // secret is an options object
app.engine('handlebars', handlebars.engine);        // uses handlebars as the .handlebars file handler
app.set('view engine', 'handlebars');               // allows omission of .handlebars ext when making file calls
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// -----Controllers----- //
app.get('/',function(req,res,next){
    var context = {};
    //If there is no session, go to the main page.
    if(!req.session.name){
        res.render('newSession', context);
        return;
    }
    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length || 0;
    context.toDo = req.session.toDo || [];
    console.log(context.toDo);
    res.render('toDo',context);
});

app.post('/',function(req,res){
    var context = {};

    if(req.body['New List']){
        req.session.name = req.body.name;
        req.session.toDo = [];
        req.session.curId = 0;
    }

    //If there is no session, go to the main page.
    if(!req.session.name){
        res.render('newSession', context);
        return;
    }

    if(req.body['Add Item']){
        req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
        req.session.curId++;
    }

    if(req.body['Done']){
        req.session.toDo = req.session.toDo.filter(function(e){
            return e.id != req.body.id;
        })
    }

    context.name = req.session.name;
    context.toDoCount = req.session.toDo.length;
    context.toDo = req.session.toDo;
    console.log(context.toDo);
    res.render('toDo',context);
});

// Page not found
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

// Error handling
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
