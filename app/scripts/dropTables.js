// dropTables.js
// =============
// [WARNING: VERY DANGEROUS, USE SPARINGLY]
// script for dropping tables form the database, used for testing.

var db = require('../db');

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

db.get().query('DROP TABLE Subjects',
    function(err, result) {
        if (err){
            console.log('Error dropping table: ' + err);
            return;
        }
        console.log('Subjects table dropped');
        db.get().end();
    });

//add further table drops here
