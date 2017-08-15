// makeConsentDatesCSV.js
// ======================
// script to output a list of particpant IDs and the dates they submitted the
// consent form

var db = require('../db');
var fs = require('fs');
var filename = 'ConsentDates.csv';

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});


//get data
var data;
db.get().query('SELECT SubjectID, DateConsented FROM Subjects ORDER BY SubjectID',
    function(err, result) {
        if (err){
            console.log('Error retrieving results: ' + err);
            process.exit();
        }
        console.log('Results retrieved.');
        data = result;
        save(convertToCSVString(data), filename);
    });

function convertToCSVString(data) {
    var CSV = 'Subject ID,Date Consented\n';
    data.forEach(function(current, index, array) {
        CSV += current.SubjectID + ',';
        CSV += current.DateConsented + '\n';
    });
    return CSV;
}

function save(data, filename) {
    fs.writeFile(filename, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(filename + ' was saved.');
        process.exit();
    });
}
