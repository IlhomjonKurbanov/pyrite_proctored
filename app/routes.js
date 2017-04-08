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
        console.log('request @ /api/subject/register-new/: ' + req.body);
        var data = [req.body.age, req.body.major, req.body.dateConsented];
        db.get().query('INSERT INTO Subjects (Age, Major, DateConsented) VALUES (?, ?, ?)',
                 data, function(err, result) {
                     if (err) throw err;
                     console.log('Registered new subject.');
                     db.get().query('SELECT * FROM Subjects', function(err, results) {
                         console.log(results[0].Age);
                         console.log(results[0].Major);
                         console.log(results[0].DateConsented);
                     });
                 });
        console.log("Register new subject.");
        //return subjectID
        res.send("Register new subject: [subjectID]");
    });

    //get subject details, based on subjectID
    app.post('/api/subject/get-subject', function(req, res) {
        //TODO
    });

    //register submittal of consent by subject
    app.post('/api/subject/register-consent', function(req, res) {
        //TODO
    });

    //register an article response in the DB
    app.post('/api/article/register-response', function(req, res) {
        //TODO
    });

    //register a spontaneous response in the DB
    app.post('/api/spontaneous/register-response', function(req, res) {
        //TODO
    });

    //get all spontaneous responses for a given subject
    app.post('/api/spontaneous/get-all-subject-responses', function(req, res) {
        //TODO
    });

    //register a new email address for the gift card drawing
    app.post('/api/drawing/register-new', function(req, res) {
        //TODO
    })

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/../public/index.html');
    });
}
