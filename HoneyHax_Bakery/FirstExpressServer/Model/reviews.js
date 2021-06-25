// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// reviews.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var reviewsDB = {

    //GET /product/:productId/reviews/
    getReviews: function (productId, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                var sql = "select r.reviewContent, r.rating, u.username from reviews r, users u where r.userId=u.userId";
                dbConn.query(sql, [productId], function (err, result) {
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


    //GET /product/:productId/reviews/:reviewId
    getReviewsById: function (productId, reviewId, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                var sql = "select r.reviewContent, r.rating, u.username from reviews r, users u where r.userId=u.userId and r.reviewId=? ";
                dbConn.query(sql, [productId, reviewId], function (err, result) {
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

    // POST /users/:userId/:productId/review (Create reviews)
    insertReviews: function (reviewContent, rating, productId, userId, callback) {   
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "insert into reviews (reviewContent, rating, productId, userId) Values(?,?,?,?)";
                dbConn.query(sql, [reviewContent, rating, productId, userId], function (err, result) {
                    dbConn.end();
                    return callback(err, result);
                });
            }
        });
    },


}
module.exports = reviewsDB;