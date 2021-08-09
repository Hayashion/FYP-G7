// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// foodshopusers.js



const mysql = require('mysql');
const db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("asdf", salt);

var foodshopusersDB = {


    getfoodusers: function (callback) {    // Get all Students
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "select * from users"
                dbConn.query(sql, function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },




    // insertStudents: function (adminNo, username, password, studentClass, callback) {   // Create/Register Students
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             var sql = "insert into login.students (adminNo, username, password, studentClass) Values(?,?,?,?)";
    //             dbConn.query(sql, [adminNo, username, password, studentClass], function (err, result) {
    //                 dbConn.end();
    //                 return callback(err, result);
    //             });
    //         }
    //     });
    // },



    insertfoodshopuser: function (username, password, callback) {   // Create/Register Students
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "insert into users (username, password) Values(?,?)";
                dbConn.query(sql, [username, password], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },



    getfooduser: function (username, callback) {   // Get particular Student from adminNo
        var dbConn = db.getConnection()
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "select * from users where username=?"
                dbConn.query(sql, [username], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },




    updatefoodusers: function (username, password, oldusername, oldpassword, callback) {     // Updating Student's info
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "update users set username=?, password=? where username=? and password=?"
                dbConn.query(sql, [username, password, oldusername, oldpassword], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },




    loginfoodusers: function (username, password, callback) {     // Login Student
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql2 = 'select password from users where username = ?';

                conn.query(sql2, [username], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                        console.log("Connected!");
                        var sql = 'select * from users where username=? and password=?';
                        conn.query(sql, [username, password], function (err, result) {
                            conn.end();
                            if (err) {
                                console.log("Error: " + err);
                                return callback(err, null, null);
                            } else {
                                var token = "";
                                if (result.length == 1) {
                                    token = jwt.sign({ id: result[0].adminNo, password: result[0].password }, config.key, {
                                        expiresIn: 36000 //expires in >1 hr
                                    });
                                    console.log("@@token " + token);
                                    return callback(null, token, result);
                                } else {
                                    var err2 = new Error("Username/Password does not match.");
                                    err2.statusCode = 500;
                                    return callback(err2, null, null);
                                }
                            }
                        });

                    }
                })
            }
        });
    },


}

module.exports = foodshopusersDB;