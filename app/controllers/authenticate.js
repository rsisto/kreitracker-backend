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
          expiresInMinutes: 1 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
	  //token: '1'	
	});
};

exports.checkToken = function(req, res, next) {
	console.log('auth');
	 // check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, config.secret, function(err, decoded) {      
	      if (err) {
		return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
		// if everything is good, save to request for use in other routes
		req.decoded = decoded;    
		//return done(null, true);
		next();
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
		success: false, 
		message: 'No token provided.' 
	    });
	    
	  }

};
