// dropTables.js
// =============
// [WARNING: VERY DANGEROUS, USE SPARINGLY]
// script for dropping tables form the database, used for testing.
// USAGE: 'node dropTable.js [tableName]' (if tableName is 'all', drops all
//        tables, but requires "ctrl+c" to end)

var db = require('../db');
var tableName = process.argv[2];
var tables = [
    'Subjects',
    'ArticleResponses',
    'ArticleDetails'
]

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

if (tableName != 'all') { //drop specified table
    db.get().query('DROP TABLE ' + tableName,
        function(err, result) {
            if (err){
                console.log('Error dropping ' + tableName + ' table: ' + err);
                process.exit();
            }
            console.log(tableName + ' table dropped.');
            process.exit();
        });
} else { //drop all tables
    tables.forEach(function(currentValue, index, array) {
        db.get().query('DROP TABLE ' + currentValue,
            function(err, result) {
                if (err){
                    console.log('Error dropping ' + currentValue + ' table: ' + err);
                }
                console.log(currentValue + ' table dropped.');
            });
    })
}
