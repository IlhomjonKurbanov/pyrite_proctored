module.exports = function(app) {
    // server routes ===========================================================
    // handle things like api calls
    // var express = require('express');
    // var router = express.Router();

    //route downloading consent form
    app.get('/download-consent', function(req, res) {
        res.download(__dirname + '/data/Consent.pdf');
    });


    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/../public/index.html');
    });
}
