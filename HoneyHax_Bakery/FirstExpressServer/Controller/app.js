// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productsDB = require('../Model/products');
const galleryDB = require('../Model/gallery');
const usersDB = require('../Model/users');
const voucherDB = require('../Model/voucher');
// const verifyFn = require('../Auth/verifyToken');

var verifyToken = require('../Auth/verifyToken');

const cors = require('cors');
const { token } = require('morgan');

app.options('*', cors());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data


//GET /users/
app.get('/users/', function(req,res){

    var userid = req.params.userid;

    usersDB.getUsers(userid, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });
});

//GET /user/
app.get('/user/:userid', function(req,res){

    var userid = req.params.userid;

    usersDB.getUser(userid, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });
});

// POST /user/ update user
app.post('/user/',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var userid = req.body.userid;
    
    console.log(username);
    console.log(password);
    console.log(userid);

    usersDB.updateUser(username, password,userid, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(201);
            res.send(`{"userid": ${result.affectRows}}`);
        }
    });
});
// POST /user/login 
app.post('/user/login',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    
    console.log(username);
    console.log(password);

    usersDB.loginUser(username, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' }); // token = jwt
            res.send();
        } else {
            res.status(500);
            res.sendStatus(err.statusCode);
        }
    });
});

//POST /user/logout
app.post('/user/logout', function (req, res) {
    console.log("..logging out.");
    //res.clearCookie('session-id'); //clears the cookie in the response
    //res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });
});

//GET /products/ 
app.get('/products/', function (req, res) {

    productsDB.getProducts(function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });

});

//Search /products/:productName/
app.get('/products/:productName/', function (req, res) {

    var productName = req.params.productName;
    console.log(productName)

    productsDB.searchProducts(productName, function (err, result) {
        

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });

});

//Search /voucher/:voucherCode/
app.get('/voucher/:voucherCode/', function (req, res) {

    var voucherCode = req.params.voucherCode;

    voucherDB.searchvoucher(voucherCode, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });

});

//GET /gallery/ 
app.get('/gallery/',function (req, res) {

    var productImg = req.body.productImg;
    var productName = req.body.productName;

    galleryDB.getGallery(productImg, productName, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(200);
            res.send(result);
        }

    });

});


module.exports = app;