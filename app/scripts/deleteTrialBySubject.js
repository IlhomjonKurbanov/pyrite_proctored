var db = require('../db');

db.connect(function(err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit();
    } else {
        console.log('Successfully connected to MySQL.');
    }
});

var subjectID = process.argv[2];

db.get().query('DELETE FROM Subjects WHERE SubjectID = ?', subjectID,
    function(err, result) {
        if (err) {
            console.log('Error deleting subject.');
        }
        console.log('Subject Deleted.');
        db.get().query('DELETE FROM ArticleResponses WHERE SubjectID = ?', subjectID,
            function(err, result) {
                if (err) {
                    console.log('Error deleting responses');
                }
                console.log('Responses deleted.');
                process.exit();
            });
    });
