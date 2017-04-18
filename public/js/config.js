// config.js
// =========
// constants for the application: configuration values & enums

// == config values ============================================================
angular.module('pyrite')
    .constant("appConfig", {
        "SURVEY_LIVE"         : false, //WARNING: be very careful with changing this
        "REQUIRE_CONSENT"     : true,
        "DO_CONSENT_REDIRECT" : false, //toggles redirect behavior that checks if user has consented
        "PROCTORED"           : false, //toggles alternate behavior on narrative response page for proctored experiments
        "PATH"                : "http://localhost:8080/"
    })
