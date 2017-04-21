// dumpTableToConsole.js
// =====================
// script to dumple any table's content to the console log
// USAGE: 'node dumpTableToConsole.js [tableName]'

var db = require('../db');
var tableName = process.argv[2];

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

db.get().query('SELECT * FROM ' + tableName,
    function(err, result) {
        if (err){
            console.log('Error retrieving ' + tableName + ' table: ' + err);
            process.exit();
        }
        console.log(tableName + ' table retrieved:');
        console.log(result);
        process.exit();
    });
