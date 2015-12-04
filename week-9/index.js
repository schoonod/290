var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res, next){
    mysql.pool.query("DROP TABLE IF EXISTS workout", function (err) {
        var createString = "CREATE TABLE workout(" +
                "id INT PRIMARY KEY AUTO_INCREMENT," +
                "name VARCHAR(255) NOT NULL," +
                "reps BOOLEAN," +
                "weight INT," +
                "date DATE," +
                "lbs BOOLEAN)";
        mysql.pool.query(createString, function (err) {
            res.render('workouts');
        });
    });
});

app.post('/', function(req, res, next){
    console.log('BODY IS ************************************************************************');
    console.log(req.body);
    mysql.pool.query("INSERT INTO workout (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)",
        [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function (err, result) {
        if (err) {
            next(err);
            return;
        }
        console.log('query select successful');
        var newRowId = result.insertId;

        // Send back what was inserted
        mysql.pool.query('SELECT * FROM workout WHERE id=?', [newRowId], function(err, rows, fields) {
            // rows contains an array of objects. Those objects have key/value pairs corresponding to the column/row pairings
            if (err) {
                next(err);
                return;
            }
            console.log('query select successful');
            context = rows;
            res.send(context);
        });
    });
});

//app.get('/', function (req, res, next) {
//    var context = {};
//    mysql.pool.query('SELECT * FROM workout', function (err, rows, fields) {
//        if (err) {
//            next(err);
//            return;
//        }
//        context.results = JSON.stringify(rows);
//        console.log(context.results);
//        res.send(context);
//    });
//});

//app.get('/simple-update', function (req, res, next) {
//    var context = {};
//    mysql.pool.query("UPDATE workout SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
//        [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id],
//        function (err, result) {
//            if (err) {
//                next(err);
//                return;
//            }
//            context.results = "Updated " + result.changedRows + " rows.";
//            res.render('home', context);
//        });
//});

//check for 404 error
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

//check for 500 error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//output affirmative to node console
app.listen(app.get('port'), function (){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});