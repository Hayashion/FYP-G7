// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// voucher.js

const mysql = require('mysql');
const db = require('./databaseConfig');
// var jwt = require('jsonwebtoken');
var config = require('../config.js');

var voucherDB = {

    //GET/voucher
    getvoucher: function (callback) {
    
        var dbConn = db.getConnection();
    
        dbConn.connect(function (err) {
    
            if (err) {
    
                console.log(err);
                return callback(err, null);
    
            } else {
                var sql = "select * from voucher ";
    
                dbConn.query(sql, [], function (err, result) {
    
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
    
    //GET /voucher/:voucherCode/
    searchvoucher: function (voucherCode, callback) {
    
        var dbConn = db.getConnection();
    
        dbConn.connect(function (err) {
    
            if (err) {
    
                console.log(err);
                return callback(err, null);
    
            } else {
                var sql = "SELECT * FROM voucher WHERE voucherCode=?"; //where should be the input field
    
                dbConn.query(sql, [voucherCode], function (err, result) {
                    
                    dbConn.end();
                    if (err) {
                        console.log(err);
                    } else if (result.length==0){
                        console.log(result);
                    } else {
                        if(result[0].voucherCode==voucherCode) {
                            console.log("Success!");
                            console.log(result);
                        } else{
                            console.log("Not a valid code.");
                            console.log(result);
                        }
                        return callback(err, result);
                    }
                    return callback(err, result);
                });
    
            }
    
        });
    }
    }
    
    module.exports=voucherDB;