// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// products.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var productsDB = {

//GET/productss
getProducts: function (callback) {

    var dbConn = db.getConnection();

    dbConn.connect(function (err) {

        if (err) {

            console.log(err);
            return callback(err, null);

        } else {
            var sql = "select * from products";

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

//GET /products/:productsName/
searchProducts: function (productName, callback) {

    var dbConn = db.getConnection();

    dbConn.connect(function (err) {

        if (err) {

            console.log(err);
            return callback(err, null);

        } else {
            var sql = "SELECT * FROM products WHERE productName=?"; //where should be the search field

            dbConn.query(sql, [productName], function (err, result) {

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
}
}


module.exports=productsDB;