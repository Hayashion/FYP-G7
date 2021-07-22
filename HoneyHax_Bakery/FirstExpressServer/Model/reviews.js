// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// reviews.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var reviewsDB = {

    // POST /reviews
    processReview: function (review, callback) {
        var filtered = { review: '', flag: '{xssishard}', attack: false };
        const regExpScript = /<script>.*<\/script>/i;
        const regExpAlert = /alert/ig;


        filtered.review = review.replace(regExpAlert, '');
        if (review.match(regExpScript) !== null) {
            filtered.attack = true;
        }

        console.log(filtered)
        return callback(null, filtered)


        //<script>al\u0065rt(1)</Script>


    },

    // injectReviews: function (name,review,callback){
    //     var input = [name,review]
    //     var filtered = [];
    //     var regExp = ("<a\s*.*>\s*.*<\/a>/g");
    //     var res = "true";
    //     input.forEach(function(item){
    //         if(regExp.test(input)){
    //             res = "false"
    //             console.log("a tag is not allowed!");
    //         }else{

    //             console.log(item);
    //         }
    //         console.log(filtered,res);

    //     });

    // }

    // //GET /product/:productId/reviews/:reviewId
    // getReviewsById: function (productId, reviewId, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             var sql = "select r.reviewContent, r.rating, u.username from reviews r, users u where r.userId=u.userId and r.reviewId=? ";
    //             dbConn.query(sql, [productId, reviewId], function (err, result) {
    //                 dbConn.end();
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log(result);
    //                 }
    //                 return callback(err, result);
    //             });
    //         }
    //     });
    // },

    // // POST /users/:userId/:productId/review (Create reviews)
    // insertReviews: function (reviewContent, rating, productId, userId, callback) {   
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             var sql = "insert into reviews (reviewContent, rating, productId, userId) Values(?,?,?,?)";
    //             dbConn.query(sql, [reviewContent, rating, productId, userId], function (err, result) {
    //                 dbConn.end();
    //                 return callback(err, result);
    //             });
    //         }
    //     });
    // },


    // //GET /product/:productId/reviews/:reviewId
    // getReviewsById: function (productId, reviewId, callback) {
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         } else {
    //             var sql = "select r.reviewContent, r.rating, u.username from reviews r, users u where r.userId=u.userId and r.reviewId=? ";
    //             dbConn.query(sql, [productId, reviewId], function (err, result) {
    //                 dbConn.end();
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                     console.log(result);
    //                 }
    //                 return callback(err, result);
    //             });
    //         }
    //     });
    // },

    // // POST /users/:userId/:productId/review (Create reviews)
    // insertReviews: function (reviewContent, rating, productId, userId, callback) {   
    //     var dbConn = db.getConnection();
    //     dbConn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             var sql = "insert into reviews (reviewContent, rating, productId, userId) Values(?,?,?,?)";
    //             dbConn.query(sql, [reviewContent, rating, productId, userId], function (err, result) {
    //                 dbConn.end();
    //                 return callback(err, result);
    //             });
    //         }
    //     });
    // },


}
module.exports = reviewsDB;