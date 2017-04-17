// createTables.js
// ===============
// script for creating all the database tables supporting this application


var db = require('../db');

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

db.get().query('CREATE TABLE Subjects(SubjectID INT NOT NULL AUTO_INCREMENT, ArticleOrder VARCHAR(255), Age INT, Field1 VARCHAR(255), Field2 VARCHAR(255), Field3 VARCHAR(255), Gender VARCHAR(255), DateConsented VARCHAR(255), PRIMARY KEY (SubjectID)) ENGINE = INNODB',
    function(err, result) {
        if (err){
            console.log('Error creating Subjects table: ' + err);
            return;
        }
        console.log('Subjects table Created');
        db.get().end();
    });

//add further table declarations here
