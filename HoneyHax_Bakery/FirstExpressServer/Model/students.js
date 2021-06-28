// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
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
                var sql = "select adminNo,username,studentName,studentClass,points from login.students"
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
                var sql = "insert into login.students (adminNo, username, password, studentClass) Values(?,?,?,?)";
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
                var sql = "select adminNo,username,studentName,studentClass from login.students where adminNo=?"
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
                var sql = "update login.students set username=?, password=? where adminNo=?"
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
                var sql = 'select * from login.students where username=? and password=?';
                conn.query(sql, [username,password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log("Error: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {
                            token = jwt.sign({ id: result[0].adminNo, password: result[0].password }, config.key, {
                                expiresIn: 3600 //expires in 1 hr
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




    deleteStudent: function (adminNo, callback) {

        var dbConn = db.getConnection();

        dbConn.connect(function (err) {

            if (err) {

                console.log(err);
                return callback(err, null);

            } else {
                var sql = "delete from login.students where adminNo=?";

                dbConn.query(sql, [adminNo], function (err, result) {

                    dbConn.end();
                    if (err) {
                        console.log(err);
                    } else {

                        console.log(result);
                    }
                    return callback(err, result);
                });

            }

        });

    },


    deleteStudents: function (studentClass, callback) {

        var dbConn = db.getConnection();

        dbConn.connect(function (err) {

            if (err) {

                console.log(err);
                return callback(err, null);

            } else {
                var sql = "delete from login.students where studentClass=?";

                dbConn.query(sql, [studentClass], function (err, result) {

                    dbConn.end();
                    if (err) {
                        console.log(err);
                    } else {

                        console.log(result);
                    }
                    return callback(err, result);
                });

            }

        });

    },


    getStudentsFlags: function (callback) {    // Get all Students Flags
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "select studentName, studentClass, points from login.students"
                dbConn.query(sql, function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },


}

module.exports = studentsDB;