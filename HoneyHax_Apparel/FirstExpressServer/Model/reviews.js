// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// reviews.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var reviewsDB = {
    
//GET/product/:id/reviews
getReviews: function (callback) {

    var dbConn = db.getConnection();

    dbConn.connect(function (err) {

        if (err) {

            console.log(err);
            return callback(err, null);

        } else {
            var sql = "select reviewContent,rating from  reviews r, products p, users u where u.userId and r.reviewId and r.reviewId=p.productId and p.productId=? ";

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
}
}
module.exports=reviewsDB;