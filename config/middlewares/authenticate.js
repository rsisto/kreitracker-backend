/**
 * Module dependencies.
 */
var jwt    = require('jsonwebtoken');
var config = require('../../config/config');

exports.authentication = function(req, res) {
	console.log('auth');
	//console.log(res.user);
	//console.log(req.user);
	var user = req.user;
       
	var token = jwt.sign(user, config.secret, {
          expiresInMinutes: 10000 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
	  //token: '1'	
	});
};


