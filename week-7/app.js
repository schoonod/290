var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);    // uses handlebars as the .handlebars file handler
app.set('view engine', 'handlebars');           // allows omission of .handlebars ext when making file calls
app.set('port', 3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//function randMath(){
//    var dtg = {};
//    dtg.time = Math.random();
//    return dtg;
//}
//
//app.get('/',function(req,res){
//    res.render('home', randMath());             // .render replaces .send
//});                                             // can take a second argument to provide dynamic content

app.get('/',function(req,res){
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.type = "GET";
    res.render('home', context);
});

app.post('/', function(req,res){
    var qParams = [];
    for (var p in req.body){
        qParams.push({'name':p,'value':req.body[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.type = "POST";
    res.render('home', context);
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
