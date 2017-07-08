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
            req.body.moreBelievableCount
        ];

        db.get().query('INSERT INTO ArticleResponses (SubjectID, Trial, ArticleID, Likert, PageTime, SpontaneousResponseCount, MoreBelievableCount) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
            req.body.moreBelievable
        ];

        db.get().query('INSERT INTO SpontaneousResponses (SubjectID, Trial, ArticleID, ElementID, MoreBelievable) VALUES (?, ?, ?, ?, ?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new spontaneous response.');
                res.send('Spontanous response registered.');
            });
    });

    //delete a given spontaneous response
    app.post('/api/spontaneous/delete', function(req, res) {
        var data = [
            req.body.SRID,
        ];

        db.get().query('DELETE FROM SpontaneousResponses WHERE SRID = (?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Deleted Spontaneous Response.');
                res.send('Spontaneous Response deleted.');
            });
    });

    //register a narrative response for a given spontaneous response
    app.post('/api/narrative/register-response', function(req, res) {
        var data = [
            req.body.SRID,
            req.body.response
        ];

        db.get().query('INSERT INTO NarrativeResponses (SRID, Response) VALUES (?, ?)',
            data, function(err, result) {
                if (err) throw err;
                console.log('Registered new narrative response.');
                res.send('Narrative response registered.');
            });
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
