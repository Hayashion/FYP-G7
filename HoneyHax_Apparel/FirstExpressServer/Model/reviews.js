// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// reviews.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var reviewsDB = {

    // POST /reviews
    processReview: function (review, stars, callback) {
        var filtered = { review: '', stars:'', flag: '', flag2:'', attack: false, mean:false };
        var inject = { review: '', flag: "{Ra_1n3_oW}", attack: false };
        var msg = {review: '', attack: false };
        const regExpscript = /<script>.*<\/script>/i;
        const regExpAlert = /alert/ig;
        var regExpAnchor = /<a\s*.*>\s*.*<\/a>/g;

        // filtered.review = review.replace(regExpAlert, '');
        // if (review.match(regExpscript) !== null) {
        //     filtered.attack = true;
        // }
        // console.log(filtered);
        // return callback(null,filtered);

        filtered.review = review.replace(regExpAlert, '');
        inject.review = review.replace(regExpAlert, '');
        msg.review = review.replace(regExpAlert, '');

        if (stars == 0) {
            filtered.mean = true
            filtered.flag2 = '{d0ntbm3an}'
            return callback(null,filtered)
        }

        if (review.match(regExpscript) !== null) {
            filtered.attack = true
            filtered.flag = '{x55isFun}'
            return callback(null, filtered);
        }

        if (review.match(regExpAnchor) !== null) {
            if (inject.attack = true) {
            }
            console.log(inject);
            return callback(null, inject);
        }
        //<script>al\u0065rt(1)</script>
        else{
            return callback(null, msg); 
        }
    },



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