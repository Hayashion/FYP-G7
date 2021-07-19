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
            var sql = "select productId,productName,price,description,productImg from products";

            dbConn.query(sql,[],function (err, result) {

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
            var sql = `SELECT * FROM products WHERE productName LIKE '${'%' + productName + '%'}'` //where should be the search field
            // 1' or 1=1;-- -
            dbConn.query(sql, [], function (err, result) {

                dbConn.end();
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    for(i=0;i<result.length;i++){
                        
                        // result[i].productImg = __dirname + '\\' + result[i].productImg
                        console.log(result[i].productImg)
                        // console("hi")
                    }

                }
                return callback(err, result);
            });

        }

    });
},



//GET /location/:locationName/
searchLocation: function (locationName, callback) {

    var dbConn = db.getConnection();

    dbConn.connect(function (err) {

        if (err) {

            console.log(err);
            return callback(err, null);

        } else {
            var sql = `SELECT * FROM locations WHERE location = '${'%' + locationName + '%'}'` //where should be the search field
            // 1' or 1=1;-- -
            dbConn.query(sql, [], function (err, result) {

                dbConn.end();
                if (err) {
                    console.log(err);
                } else {
                    // console.log(result);
                    for(i=0;i<result.length;i++){
                        
                        // result[i].productImg = __dirname + '\\' + result[i].productImg
                       
                        console.log('success')
                    }

                }
                return callback(err, result);
            });

        }

    });
}
}


module.exports=productsDB;