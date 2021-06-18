// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// voucher.js

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
                    } else {
    
                        console.log(result);
                    }
                    return callback(err, result);
                });
    
            }
    
        });
    }
    }
    
    module.exports=voucherDB;