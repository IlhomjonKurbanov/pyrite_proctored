// db.js
// =====
// database service for node.js back end

var mysql = require('mysql');
var config = require('./config/db_config');

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var conn_pool;

exports.connect = function(done) {
    conn_pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DB_MODE === 'production' ? config.NAME_PROD : config.NAME_TEST
    });

    done();
}

exports.get = function() {
    return conn_pool;
}
