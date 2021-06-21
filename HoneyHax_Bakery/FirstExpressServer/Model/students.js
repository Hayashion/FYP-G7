// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// students.js



const mysql = require('mysql');
const db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

var studentsDB = {


    getStudents: function (callback) {    // Get all Students
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




    insertStudents: function (adminNo, username, password, studentClass, callback) {   // Create/Register Students
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "insert into students (adminNo, username, password, studentClass) Values(?,?,?,?)";
                dbConn.query(sql, [adminNo, username, password, studentClass], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },



    getStudent: function (adminNo, callback) {   // Get particular Student from adminNo
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




    updateStudents: function (username, password, adminNo, callback) {     // Updating Student's info
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



    
    loginStudents: function (username, password, callback) {     // Login Student
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

module.exports = studentsDB;