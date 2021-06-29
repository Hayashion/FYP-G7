// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// admin.js



const mysql = require('mysql');
const db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

var adminDB = {


    insertAdmin: function (adminid, username, password, callback) {   // Create/Register Admin
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "insert into login.admin (adminid, username, password) Values(?,?,?)";
                dbConn.query(sql, [adminid, username, password], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },

    updateAdmin: function (username, password, adminid, callback) {     // Updating Admin's info
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "update login.admin set username=?, password=? where adminid=?"
                dbConn.query(sql, [username, password, adminid], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },
    
    loginAdmin: function (username, password, callback) {     // Login Admin
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select * from login.admin where username=? and password=?';
                conn.query(sql, [username,password], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log("Error: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {
                            token = jwt.sign({ id: result[0].adminid, password: result[0].password }, config.key, {
                                expiresIn: 3600 //expires in 1 hr
                            });
                            console.log("@@token " + token);
                            return callback(null, token, result);
                        } else {
                            var err2 = new Error("AdminID/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }
                });
            }
        });
    },


}

module.exports = adminDB;