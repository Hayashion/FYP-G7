// Class: DISM/FT/3A/02
// FYP Group 7
// HoneyHAX Bakery

const express= require('express');
const serveStatic =require('serve-static');

var hostname="localhost";
var port=3001;

var app=express();

app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);

    if(req.method!="GET"){
        res.type('.html');
        var msg="<html><body>This server only serves web pages with GET!</body></html>";
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/Public",{index:'home.html'})); 

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(port,hostname,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});