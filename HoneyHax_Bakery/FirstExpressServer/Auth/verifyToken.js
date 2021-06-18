var jwt = require('jsonwebtoken');

var config = require('../config');

var verifyFn = {
    verifyToken: function (req, res, next) {


        var token = req.headers['authorization']; //retrieve authorization header's content

        res.type('json')
        if (!token || !token.includes('Bearer')) { //process the token

            res.status(403);
            res.send({message: 'Not authorized!' });
        }

        else {
            //    token=token.split('Bearer ')[1]; //obtain the token's value
            token = token.substring(7) //obtain the token's value

            jwt.verify(token, config.key, function (err, decoded) { //verify token

                if (err) {
                    res.status(403);
                    res.end({ auth: false, message: 'Not authorized!' });
                }
                else {
                    req.id = decoded.id; //decode the userid and store in req for use
                    req.role = decoded.role; //decode the role and store in req for use
                    next();
                }

            });
        }
    },
    verifyAdminRights: function(req,res,next){

        if(req.role=="admin"){
            next();
        }else{
            res.status(403);
            res.send({message: 'Not authorized!' });
            
        }
    }
}

module.exports = verifyFn;