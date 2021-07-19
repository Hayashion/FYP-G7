// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// reviews.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var reviewsDB = {

    // GET /reviews
    processReview: function (name, review, callback) {
        var args = [name, review]
        var regExp = /<a\s*.*>\s*.*<\/a>/g;
        var filtered = [];
        var attack = false;
        args.forEach(function (item) {
            if (item.includes("<script>") && item.includes('</script>')) {
                attack = true;
                item = item.replace('<script>', '');
                item = item.replace('</script>', '');
                filtered.push(item);
            }

            else {filtered.push(item)}
        }),

        args.forEach(function(item){
            // if(regExp==args){
            if(regExp.test(args)){
                attack = "true"
                // filtered.push(item);
            } else {

                filtered.push(item);
            }


        });

        console.log(filtered, attack)
        return callback(null, [filtered[0], filtered[1], attack])





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


}
module.exports = reviewsDB;