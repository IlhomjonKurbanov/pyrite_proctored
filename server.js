<!-- server.js -->

// == set up ===================================================================
var express    = require('express');
var app        = express();                      // create our app w/ express
var mysql      = require('mysql');               //
var morgan     = require('morgan');              // log requests to the console (express4)
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var port = process.env.PORT || 8080;

// == configuration ============================================================
// var database = require('./config/database');
// var con = mysql.createConnection({
//     host: database.DB_HOST,
//     user: database.DB_USER,
//     password: database.DB_PASSWORD
// });
// con.connect(function(err){
//     if(err){
//         console.log('Error connecting to Db');
//         return;
//     }
//     console.log('Connection established');
// });

app.use(express.static(__dirname + '/public'));                 // set static files location, /public/server.js is now /server.js
app.use(express.static(__dirname + '/app'));                    // set additional static
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// == routes ===================================================================
require('./app/routes')(app); // pass our application into our routes

// == listen (start app with node server.js) ===================================
var d = new Date();
console.log("App started on: " + d.toLocaleString()); //just for confirming nodemon restarts after changes
app.listen(port);
console.log("App listening on port " + port);
