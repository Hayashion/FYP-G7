// Class: DISM/FT/2A/02
// Admission No: P1950023
// Name: Ang Yuran


var express = require('express');
var serveStatic = require('serve-static');

var app = require('./Controller/app');

var port = 8081;

app.use(serveStatic(__dirname + '/Public')); 

var server = app.listen(port, function(){
    console.log('Web App Hosted at http://localhost:%s', port);
});