// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productsDB = require('../Model/products');
const galleryDB = require('../Model/gallery');
const studentsDB = require('../Model/students');
const reviewsDB = require('../Model/reviews');
// const verifyFn = require('../Auth/verifyToken');

var verifyToken = require('../Auth/verifyToken');

const cors = require('cors');
const { token } = require('morgan');

app.options('*', cors());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data


//GET /students/

app.get("/students", function (req, res) {
    studentsDB.getStudents(function (err, result) {
        res.type("json")
        if (!err) {
            res.status(200);
            res.send(result);
        }
        else {
            res.status(500);
            res.send(`"Internal Server Error"`);
        }
    });
});





//GET /students/:adminNo
app.get('/students/:adminNo', function(req,res){

    var adminNo = req.params.adminNo;

    studentsDB.getStudent(adminNo, function (err, result) {

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



// PUT /students/:adminNo update students
app.put('/students/:adminNo',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var adminNo = req.params.adminNo;
    
    console.log(username);
    console.log(password);
    console.log(adminNo);

    studentsDB.updateStudents(username, password, adminNo, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(201);
            res.send(`{"Updated Student": ${result.affectedRows}}`);
        }
    });
});





// POST /students
app.post("/students", function (req, res) {   
    var username = req.body.username;
    var password = req.body.password;
    var adminNo = req.body.adminNo;
    var studentClass = req.body.studentClass;

    studentsDB.insertStudents(adminNo, username, password, studentClass, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"Student Created": ${result.affectedRows}}`)
            // res.send();

        }
        else {
            if (err.code == "ER_BAD_NULL_ERROR"){
                res.status(422);
                res.send(`"Unprocessable Entity: One or more field is empty. Please try again.`)
            } else {
                res.status(500);
                res.send(`"Internal Server Error"`);
            }
        }
    });
});




// POST /students/login 
app.post('/students/login',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    
    console.log(username);
    console.log(password);

    studentsDB.loginStudents(username, password, function (err, token, result) {
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




//POST /students/logout
app.post('/students/logout', function (req, res) {
    console.log("..logging out.");
    //res.clearCookie('session-id'); //clears the cookie in the response
    //res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });
});



//GET /products/ 
app.get('/products/', function (req, res) {

    var productId = req.params.productId;

    productsDB.getProducts(productId, function (err, result) {

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



// POST /users/:userId/:productId/review
app.post('/users/:userId/:productId/review', function (req, res) {
    var userId = req.params.userId;
    var productId = req.params.productId;
    var reviewContent = req.body.reviewContent;
    var rating = req.body.rating;

    res.type('json');
    reviewsDB.insertReviews(reviewContent, rating, productId, userId, function (err, result) {
        if (err) {
            res.status(500);
            // res.send(`"Internal Server Error"`);
            res.send(err)
        } else {
            res.status(201);
            res.send(`"reviewid":"${result.insertId}"`);
        }
    });
});



// GET /product/:productId/reviews/:reviewId
app.get('/product/:productId/reviews/:reviewId', function (req, res) {
    var productId = req.params.productId;
    var reviewId = req.params.reviewId;

    res.type('json');
    reviewsDB.getReviewsById(productId, reviewId, function (err, result) {
        if (err) {
            res.status(500);
            res.send(`"Internal Server Error"`);
        } else {
            res.status(200);
            res.send(result);
        }
    });
});



// GET /product/:productId/reviews/
app.get('/product/:productId/reviews/', function (req, res) {
    var productId = req.params.productId;

    res.type('json');
    reviewsDB.getReviews(productId, function (err, result) {
        if (err) {
            res.status(500);
            res.send(`"Internal Server Error"`);
        } else {
            res.status(200);
            res.send(result);
        }
    });
});



module.exports = app;