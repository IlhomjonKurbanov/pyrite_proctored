// makeResultsCSV.js
// =================
// script to output the necessary data into a structured CSV, to be analyzed

var db = require('../db');
var fs = require('fs');
var filename = 'results.csv';

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

//desired output schema:
//subject, age, gender, field1, field2, field3, trial, articleID, linkDensity, video, images, wordCount, fontSize, serifP, videoLocation, belief, pgtime

//get data
var data;
db.get().query('SELECT Subjects.SubjectID, Subjects.Age, Subjects.Gender, Subjects.Field1, Subjects.Field2, Subjects.Field3, Responses.Trial, Responses.ArticleID, Details.LinkDensity, Details.Video, Details.Images, Details.WordCount, Details.BodyFontSize, Details.TitleFontSize, Details.SerifP, Details.VideoLocation, Responses.Likert, Responses.PageTime FROM Subjects INNER JOIN ArticleResponses Responses ON Subjects.SubjectID = Responses.SubjectID INNER JOIN ArticleDetails Details ON Responses.ArticleID = Details.ID ORDER BY Subjects.SubjectID, Responses.Trial',
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
    var CSV = '';
    data.forEach(function(current, index, array) {
        CSV += current.SubjectID + ',';
        CSV += current.Age + ',';
        CSV += current.Gender + ',';
        CSV += current.Field1 + ',';
        CSV += current.Field2 + ',';
        CSV += current.Field3 + ',';
        CSV += current.Trial + ',';
        CSV += current.ArticleID + ',';
        CSV += current.LinkDensity + ',';
        CSV += current.Video + ',';
        CSV += current.Images + ',';
        CSV += current.WordCount + ',';
        CSV += current.BodyFontSize + ',';
        CSV += current.TitleFontSize + ',';
        CSV += current.SerifP + ',';
        CSV += current.VideoLocation + ',';
        CSV += current.Likert + ',';
        CSV += current.PageTime + '\n';
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
