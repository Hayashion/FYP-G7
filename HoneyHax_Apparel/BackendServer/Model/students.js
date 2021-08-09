// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// students.js



const mysql = require('mysql');
const db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("asdf", salt);

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





    insertStudents: function (adminNo, studentName,username, password, studentClass, callback) {   // Create/Register Students
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var hashedPassword = bcrypt.hashSync(`${password}`, salt);
                var sql = "insert into login.students (adminNo, studentName, username, password, studentClass) Values(?,?,?,?,?)";
                dbConn.query(sql, [adminNo, studentName, username, hashedPassword, studentClass], function (err, result) {
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


    updateStudents: function (studentName, username, studentClass, password, newAdminNo, oldAdminNo, callback) {     // Updating Student's info
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var data = [studentName, username, studentClass, newAdminNo, oldAdminNo];
                if (password == null){
                    var sql = "update login.students set studentName=?, username=?, studentClass=?, adminNo=? where adminNo=?";
                }else{
                    var hashedPassword = bcrypt.hashSync(`${password}`, salt);
                    data.splice(3, 0, hashedPassword);
                    var sql = "update login.students set studentName=?, username=?, studentClass=?, password=?, adminNo=? where adminNo=?";
                }
                
                dbConn.query(sql, data, function (err, result) {
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
                var err2 = new Error("AdminNo/Password does not match.");
                err2.statusCode = 500;
                return callback(err2, null, null);
            }
            else {
                console.log("Connected!");
                try{
                    var sql2 = 'select password from login.students where username = ?';

                    conn.query(sql2,[username],function(err,result){
                        if(err){
                            conn.end();
                            var err2 = new Error("Username/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }else{
                            result=JSON.parse(JSON.stringify(result))
                            try{
                                console.log(result)
                                var hashedPassword = result[0]['password']
                                console.log(hashedPassword)
                                if (bcrypt.compareSync(password,hashedPassword)==true){
                                    console.log("Connected!");
                                    var sql = 'select * from login.students where username=? and password=?';
                                    conn.query(sql, [username,hashedPassword], function (err, result) {
                                        conn.end();
                                        if (err) {
                                            console.log("Error: " + err);
                                            var err2 = new Error("Username/Password does not match.");
                                            err2.statusCode = 500;
                                            return callback(err2, null, null);
                                        } else {
                                            var token = "";
                                            var i;
                                            if (result.length == 1) {
                                                token = jwt.sign({ id: result[0].adminNo, password: result[0].password}, config.key, {
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
                                } else{
                                    console.log("false")
                                    var err2 = new Error("AdminNo/Password does not match.");
                                    err2.statusCode = 500;
                                    return callback(err2, null, null);
                                }
                                
                            }catch(err){
                                console.log(err)
                                var err2 = new Error("AdminNo/Password does not match.");
                                err2.statusCode = 500;
                                return callback(err2, null, null);
                            }
    
                        }
                    })

                }catch(err){
                    console.log(err)
                    var err2 = new Error("AdminNo/Password does not match.");
                    err2.statusCode = 500;
                    return callback(err2, null, null);
                }

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
                        console.log("Hello")
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
                var sql = "select studentName,username , studentClass, points from login.students"
                dbConn.query(sql, function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },


}

module.exports = studentsDB;