// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Bakery
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productsDB = require('../Model/products');
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const aboutDB = require('../Model/about');
const flagsDB = require('../Model/flags');

const studentsDB = require('../Model/students');

const reviewsDB = require('../Model/reviews');
const adminDB = require('../Model/admin');

const usersDB = require('../Model/users');

const voucherDB = require('../Model/voucher');

// const verifyFn = require('../Auth/verifyToken');

const verifyFn = require('../Auth/verifyToken');


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

// get all student flags
app.get("/studentsflag", function (req, res) {
    studentsDB.getStudentsFlags(function (err, result) {
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



// PUT /students/:adminNo update students
app.put('/students/:adminNo',function(req,res){
    var studentName = req.body.studentName;
    var username = req.body.username;
    var studentClass = req.body.studentClass;
    var password = req.body.password;
    var newAdminNo = req.body.adminNo;
    var oldAdminNo = req.params.adminNo;
    if(password == "" || password == null || typeof(password) == "undefined"){
        password = null;
    }

    studentsDB.updateStudents(studentName, username, studentClass, password, newAdminNo, oldAdminNo, function (err, result) {
        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"affectedRows": "${result.affectedRows}"}`);
        }
    });
});



// POST /students
app.post("/students", function (req, res) {   
    var username = req.body.username;
    var password = req.body.password;
    var adminNo = req.body.adminNo;
    var studentClass = req.body.studentClass;
    var studentName = req.body.studentName;


    studentsDB.insertStudents(adminNo,studentName, username, password, studentClass, function (err, result) {
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
                console.log(err)
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


// POST /admin/login 
// app.post('/admin/login',function(req,res){

//     var username = req.body.username;
//     var password = req.body.password;
    
//     console.log(username);
//     console.log(password);

//     adminDB.loginAdmin(username, password, function (err, token, result) {
//         if (!err) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             delete result[0]['password'];//clear the password in json data, do not send back to client
//             console.log(result);
//             res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' }); // token = jwt
//             res.send();
//         } else {
//             res.status(500);
//             res.sendStatus(err.statusCode);
//         }
//     });
// });


// POST /admin
app.post("/admin", function (req, res) {   
    var username = req.body.username;
    var password = req.body.password;
    var adminid = req.body.adminid;

    adminDB.insertAdmin(adminid, username, password, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"Teacher Created": ${result.affectedRows}}`)
            // res.send();

        }
        else {
            if (err.code == "ER_BAD_NULL_ERROR"){
                res.status(422);
                res.send(`"Unprocessable Entity: One or more field is empty. Please try again.`)
            } else {
                res.status(500);
                console.log(err)
                res.send(`"Internal Server Error"`);
            }
        }
    });
});


// POST /admin/login  allow the admin acct to log in
app.post('/admin/login',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    
    console.log(username);
    console.log(password);

    adminDB.loginAdmin(username, password, function (err, token, result) {
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


//POST /admin/logout
app.post('/admin/logout', function (req, res) {
    console.log("..logging out.");
    //res.clearCookie('session-id'); //clears the cookie in the response
    //res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });
});


// DELETE /students/:adminNo/ 


app.delete('/students/:adminNo/', function (req, res) {

    var adminNo = req.params.adminNo;

    studentsDB.deleteStudent(adminNo, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {
            res.status(204);
            res.send('');
        }

    });

});

// Delete all students in same class
app.delete('/classDelete/:studentClass/', function (req, res) {

    var studentClass = req.params.studentClass;

    studentsDB.deleteStudents(studentClass, function (err, result) {

        res.type('json');
        if (err) {
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);

        } else {

            res.status(200);
            res.send(`{"message":"Successfully Deleted users in class ${studentClass}}`);
        }

    });

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

//Search /staff/:staffName/
app.get('/staff/:staffName/', function (req, res) {
    var staffName = req.params.staffName;

    productsDB.searchStaff(staffName, function (err, result) {
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

app.get('/voucher/', function (req, res) {
    voucherDB.getvoucher(function (err, result) {
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


//POST /checkFlag
app.post('/checkFlag/',function (req, res) {

    var adminID = req.body.adminID;
    var flagValue = req.body.flagValue;


    flagsDB.checkFlag(adminID, flagValue, function (err, result) {
        console.log(err,result)

        res.type('json');
        if (err) {
            console.log(err)
            res.status(500);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(200);
            res.send(result);
        }

    });

});




// POST /users/:userId/:productId/review
// app.post('/users/:userId/:productId/review', function (req, res) {
//     var userId = req.params.userId;
//     var productId = req.params.productId;
//     var reviewContent = req.body.reviewContent;
//     var rating = req.body.rating;

//     res.type('json');
//     reviewsDB.insertReviews(reviewContent, rating, productId, userId, function (err, result) {
//         if (err) {
//             res.status(500);
//             // res.send(`"Internal Server Error"`);
//             res.send(err)
//         } else {
//             res.status(201);
//             res.send(`"reviewid":"${result.insertId}"`);
//         }
//     });
// });



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


// POST /review
app.post('/review', function (req, res) {
    var review = req.body.review
    var stars = req.body.rating
    console.log(review,stars)

    res.type('json');
    reviewsDB.processReview(review, stars, function (err, result) {
        console.log(err);
        if (err) {
            res.status(500);
            res.send(`"Internal Server Error"`);
        } else {
            res.status(200);
            res.send(result); //
        }
    });
});


// GET /about
app.get('/about', function (req, res) {
    var url = req.query.url;
    console.log(url)

    res.type('json');
    aboutDB.processAbout(url, function (err, result) {
        console.log(err);
        if (err) {
            res.status(500);
            res.send(`"Internal Server Error"`);
        } else {
            res.status(200);
            res.send(result); //
        }
    });
});

//get users 
app.get("/users", function (req, res) {
    usersDB.getUsers(function (err, result) {
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

// get user
app.get('/users/:username', function(req,res){

    var username = req.params.username;

    usersDB.getUser(username, function (err, result) {

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

// post new user
app.post("/users", function (req, res) {   
    var username = req.body.username;
    var password = req.body.password;

    usersDB.insertUsers(username, password, function (err, result) {
        if (!err) {
            res.status(201);
            res.send(`{"User Created": ${result.affectedRows}}`)
            // res.send();

        }
        else {
            if (err.code == "ER_BAD_NULL_ERROR"){
                res.status(422);
                res.send(`"Unprocessable Entity: One or more field is empty. Please try again.`)
            } else {
                res.status(500);
                console.log(err)
                res.send(`"Internal Server Error"`);
            }
        }
    });
});

// update /users/:userid 
app.put('/users/:userid',function(req,res){
    
    var newusername = req.body.newusername;
    var userid = req.params.userid;
    var newpassword = req.body.newpassword;

    usersDB.updateUser(newusername, newpassword, userid, function (err, result) {
        res.type('json');
        if (err) {
            res.status(500);
            console.log(err);
            res.send(`{"message":"Internal Server Error"}`);
        } else {
            res.status(201);
            res.send(`{"affectedRows": "${result.affectedRows}"}`);
        }
    });
});


app.post('/users/login',function(req,res){

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



module.exports = app;