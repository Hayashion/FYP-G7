// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// admin.js



const mysql = require('mysql');
const db = require('./databaseConfig');
var jwt = require('jsonwebtoken');
var config = require('../config.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("asdf", salt);

var adminDB = {


    insertAdmin: function (username, password, callback) {   // Create/Register Admins
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var hashedPassword = bcrypt.hashSync(`${password}`, salt);
                var sql = "insert into login.admin (username, password) Values(?,?)";
                dbConn.query(sql, [username, hashedPassword], function (err, result) {
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
                var sql2 = 'select password from login.admin where username = ?';

                conn.query(sql2,[username],function(err,result){
                    if(err){
                        console.log(err)
                    }else{
                        
                        result=JSON.parse(JSON.stringify(result))
                        try{
                            console.log(result)
                            var hashedPassword = result[0]['password']
                            console.log(hashedPassword)
                            if (bcrypt.compareSync(password,hashedPassword)==true){
                                console.log("Connected!");
                                var sql = 'select * from login.admin where username=? and password=?';
                                conn.query(sql, [username,hashedPassword], function (err, result) {
                                    conn.end();
                                    if (err) {
                                        console.log("Error: " + err);
                                        return callback(err, null, null);
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
                            }
                            
                        }catch(err){
                            console.log(err)
                            var err2 = new Error("AdminNo/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }

                    }
                })
            }
        });
    },





}

module.exports = adminDB;