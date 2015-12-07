var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/reset', function(req, res, next){
    mysql.pool.query("DROP TABLE IF EXISTS workout", function (err) {
        var createString = "CREATE TABLE workout(" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(255) NOT NULL," +
            "reps BOOLEAN," +
            "weight INT," +
            "date VARCHAR(255)," +
            "lbs BOOLEAN)";
        console.log('table dropped');
        mysql.pool.query(createString, function (err) {
            res.render('workouts');
        });
    });
});

app.get('/edit',function(req,res) {
    var context = {};
    var id;
    for (var p in req.query) {
        if (p = "id")
            id = req.query[p];
    }

    console.log(id);
    mysql.pool.query('SELECT * FROM workout WHERE id=?', [id], function(err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        context.id = rows[0].id;
        context.name = rows[0].name;
        context.reps = rows[0].reps;
        context.weight = rows[0].weight;
        context.date = rows[0].date;
        context.lbs = rows[0].lbs;

        res.render('edit', context);
    });
});


app.get('/workouts', function(req,res){
    res.render('workouts');
});


app.post('/', function(req, res, next) {
    if(req.body['addExercises']){
        mysql.pool.query("INSERT INTO workout (`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)",
            [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function (err, result) {
            if (err) {
                next(err);
                return;
            }
            var newRowId = result.insertId;

            mysql.pool.query('SELECT * FROM workout WHERE id=?', [newRowId], function(err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                context = rows;
                res.send(context);
            });
        });
    }

    if(req.body['removeExercise']){
        var context = {};
        mysql.pool.query("DELETE FROM workout WHERE id=?", [req.body.id], function (err, result) {
            if (err)
                next(err);
            res.send(context);
        });
    }

    if(req.body['Edit Exercise']){
        var context = {};
        mysql.pool.query("UPDATE workout SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?",
            [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id], function (err, result) {
            if (err)
                next(err);
            console.log("changed rows are " + result.changedRows);
            mysql.pool.query('SELECT * FROM workout', function(err, rows, fields) {
                if (err)
                    next(err);
                context.dataList = rows;
                console.log(context.dataList);
                res.render('workouts', context);
            });
        });
    }
});

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