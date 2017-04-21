// dropTables.js
// =============
// [WARNING: VERY DANGEROUS, USE SPARINGLY]
// script for dropping tables form the database, used for testing.
// USAGE: 'node dropTable.js [tableName]' (if tableName is 'all', creates all)

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

if (tableName == 'Subjects' || tableName == 'all') {
    db.get().query('DROP TABLE Subjects',
        function(err, result) {
            if (err){
                console.log('Error dropping table: ' + err);
                process.exit();
            }
            console.log('Subjects table dropped');
            process.exit();
        });
}
if (tableName == 'PrizeDrawingParticipants' || tableName == 'all') {
    db.get().query('DROP TABLE PrizeDrawingParticipants',
        function(err, result) {
            if (err){
                console.log('Error creating PrizeDrawingParticipants table: ' + err);
                process.exit();
            }
            console.log('PrizeDrawingParticipants table dropped.');
            process.exit();
        });
}
//add further table drops here
