// dropTables.js
// =============
// [WARNING: VERY DANGEROUS, USE SPARINGLY]
// script for dropping tables form the database, used for testing.
// USAGE: 'node dropTable.js [tableName]'

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


db.get().query('DROP TABLE ' + tableName,
    function(err, result) {
        if (err){
            console.log('Error dropping ' + tableName + ' table: ' + err);
            process.exit();
        }
        console.log(tableName + ' table dropped.');
        process.exit();
    });
