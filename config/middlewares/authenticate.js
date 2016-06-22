/**
 * Module dependencies.
 */
var jwt    = require('jsonwebtoken');
var config = require('../../config/config');

exports.authentication = function(req, res, next) {
	console.log("req.user: " + req.user);

	var user = req.user;
       
	var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 5000000 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
	  //token: '1'	
	});
	next();
	
};


