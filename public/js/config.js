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
    });

// == demographic values =======================================================
angular.module('pyrite')
    .constant("demographicValues", {
        "fields" : {
            { val: "Select a field...", disabled: true },
            { val: "Arts & Sciences" },
            { val: "Built Environments" },
            { val: "Business" },
            { val: "Dentistry" },
            { val: "Education" },
            { val: "Engineering" },
            { val: "Environment" },
            { val: "The Information School" },
            { val: "Law" },
            { val: "Medicine" },
            { val: "Nursing" },
            { val: "Ocean & Fishery Science" },
            { val: "Pharmacy" },
            { val: "Public Affairs" },
            { val: "Public Health" },
            { val: "ROTC" },
            { val: "Social Work" },
            { val: "Other:" }
        },
        "genders" : {
            { val: 'Select a gender...', disabled: true },
            { val: 'Male' },
            { val: 'Female' },
            { val: 'Non-Binary' },
            { val: 'Prefer not to respond' }
        }
    });
