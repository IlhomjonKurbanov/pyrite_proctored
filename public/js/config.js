angular.module('pyrite').constant("appConfig", {
    "SURVEY_LIVE"     : false, //WARNING: be very careful with changing this
    "REQUIRE_CONSENT" : false,
    "PATH"            : "http://localhost:8080/"
});
angular.module('pyrite').constant("dbConfig", {
    "DB_HOST"     : "",
    "DB_USER"     : "",
    "DB_PASSWORD" : ""
});
