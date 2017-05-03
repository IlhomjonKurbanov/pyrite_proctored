// routes.js
// =========
// APIs for the application, and all front-end routes are passed on to the
// front-end router
module.exports = function(app, db) {
    // == API ==================================================================

    //download "signed" consent form
    app.get('/api/download-consent', function(req, res) {
        res.download(__dirname + '/data/Consent.pdf');
    });

    //register a new subject in the DB, return subjectID
    app.post('/api/subject/register-new', function(req, res) {
        var data = [
            req.body.articleOrder,
            req.body.age,
            req.body.field1,
            req.body.field2,
            req.body.field3,
            req.body.gender,
            req.body.dateConsented
        ];

        var subjectID;
        db.get().query('INSERT INTO Subjects (ArticleOrder, Age, Field1, Field2, Field3, Gender, DateConsented) VALUES (?, ?, ?, ?, ?, ?, ?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new subject. SubjectID: ' + result.insertId);
                subjectID = result.insertId;
                res.json({subjectID : result.insertId});
            });
    });

    //register an article response in the DB
    app.post('/api/article/register-response', function(req, res) {
        var data = [
            req.body.subjectID,
            req.body.trial,
            req.body.articleID,
            req.body.likert,
            req.body.pageTime,
            req.body.SRCount,
            req.body.thumbsUpCount
        ];

        db.get().query('INSERT INTO ArticleResponses (SubjectID, Trial, ArticleID, Likert, PageTime, SpontaneousResponseCount, ThumbsUpCount) VALUES (?, ?, ?, ?, ?, ?, ?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new ArticleResponse.');
                res.send('Article response registered.')
            });
    });

    //register a spontaneous response in the DB
    app.post('/api/spontaneous/register-response', function(req, res) {
        var data = [
            req.body.subjectID,
            req.body.trial,
            req.body.articleID,
            req.body.elementID,
            req.body.thumbsUp
        ];

        db.get().query('INSERT INTO SpontaneousResponses (SubjectID, Trial, ArticleID, ElementID, ThumbsUp) VALUES (?, ?, ?, ?, ?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new spontaneous response.');
                res.send('Spontanous response registered.');
            });
    });

    //get all spontaneous responses for a given subject
    app.post('/api/spontaneous/get-all-subject-responses', function(req, res) {
        var data = [
            req.body.subjectID,
        ];

        db.get().query('SELECT SRID, Trial, ArticleID, ElementID, ThumbsUp FROM SpontaneousResponses WHERE SubjectID = (?) ORDER BY Trial, SRID',
            data, function(err, result) {
                if (err) throw err;
                var results = {};
                var index = 0;
                result.forEach(function(element, index, array) {
                    results[index] = {
                        SRID: element.SRID,
                        trial: element.Trial,
                        articleID: element.ArticleID,
                        elementID: element.ElementID,
                        thumbsUp: (element.ThumbsUp == 0) ? false : true
                    }
                    index++;
                });
                res.json(results);
            });
    });

    //register a narrative response for a given spontaneous response
    app.post('/api/narrative/register-response', function(req, res) {
        //TODO
    });

    //register a new email address for the gift card drawing
    app.post('/api/prize/register-new', function(req, res) {
        var data = [
            req.body.email
        ];

        //'insert ignore' to avoid duplicates
        db.get().query('INSERT IGNORE INTO PrizeDrawingParticipants (EmailAddress) VALUES (?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new prize drawing participant.');
                res.send('Prize drawing participant registered.');
            });
    })

    // frontend routes =========================================================
    //get files
    app.get('/app/data/:filename', function(req, res) {
        res.sendFile(__dirname + '/data/' + req.params.filename);
    });

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/../public/index.html');
    });
}
