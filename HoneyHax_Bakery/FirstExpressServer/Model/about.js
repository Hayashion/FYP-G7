// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// about.js

const mysql = require('mysql');
var db = require('./databaseConfig');

var aboutDB = {

    //GET /about.html
    processAbout: function (url, callback) {
        var args = [url]
        var filtered = [];
        var attack = false;
        args.forEach(function (item) {
            if (item.includes("alert") && item.includes('onload="')) {
                attack = true;
                filtered.push(item);
            }
            else {filtered.push(item)}
        });

        console.log(filtered, attack)
        return callback(null, [filtered[0],attack])

    }


}
module.exports = aboutDB;