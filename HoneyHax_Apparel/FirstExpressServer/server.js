// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// server.js


var express = require('express');
var serveStatic = require('serve-static');

var app = require('./Controller/app');

var port = 8081;

app.use(serveStatic(__dirname + '/Public')); 

var server = app.listen(port, function(){
    // console.log('Web App Hosted at http://localhost:%s', port);
    console.log('HoneyHAX Backend Hosted at http://localhost:%s', port);
});