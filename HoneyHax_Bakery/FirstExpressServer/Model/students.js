// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// user.js



const mysql = require('mysql');
const db = require('./databaseConfig');
// var jwt = require('jsonwebtoken');
var config = require('../config.js');

var usersDB = {


    getUsers: function (callback) {    // Get all users
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "select * from students"
                dbConn.query(sql, function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },




    insertUsers: function (username, password, adminNo, callback) {   // Create/Register users
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "insert into students (username, password, adminNo) Values(?,?,?)";
                dbConn.query(sql, [username, email, password, adminNo], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },



    getUser: function (adminNo, callback) {   // Get particular user from adminNo
        var dbConn = db.getConnection()
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "select * from students where adminNo=?"
                dbConn.query(sql, [adminNo], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },




    updateUser: function (username, password, adminNo, callback) {     // Updating user's info
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "update students set username=?, password=? where adminNo=?"
                dbConn.query(sql, [username, password, adminNo], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },


    loginUser: function (username, password, callback) {     // Login user
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select * from students where username=? and password=?';
                conn.query(sql, [username,password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log("Error: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {
                            token = jwt.sign({ id: result[0].adminNo, role: result[0].role }, config.key, {
                                expiresIn: 86400 //expires in 24 hrs
                            });
                            console.log("@@token " + token);
                            return callback(null, token, result);
                        } else {
                            var err2 = new Error("AdminNo/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }
                });
            }
        });
    },




}

module.exports = usersDB;