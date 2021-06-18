// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// databaseConfig.js

var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",               // This is your own username of your SQL Database.
            password: "password",      // This is your own password of your SQL Database.
            database: "clothesshop" // test
        });     
        return conn;
    }
};
module.exports = dbconnect;
