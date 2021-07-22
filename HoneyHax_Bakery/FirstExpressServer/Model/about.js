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
        var flag = '{1mag3}'
        var attack = false;
        args.forEach(function (item) {
            if (item.includes("alert") && item.includes('onload="')) {
                attack = true;
                filtered.push(item);
                filtered.push(flag);
            }
            else {filtered.push(item)}
        });

        console.log(filtered, attack)
        return callback(null, [filtered[0],filtered[1],attack])

    }


}
module.exports = aboutDB;