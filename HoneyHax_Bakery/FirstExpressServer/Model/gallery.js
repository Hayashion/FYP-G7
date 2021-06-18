// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// gallery.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var galleryDB = {
    
//GET/gallery
getGallery: function (productImg, productName, callback) {

    var dbConn = db.getConnection();

    dbConn.connect(function (err) {

        if (err) {

            console.log(err);
            return callback(err, null);

        } else {
            var sql = "select productImg, productName from products";

            dbConn.query(sql, [productImg, productName], function (err, result) {

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
module.exports=galleryDB;