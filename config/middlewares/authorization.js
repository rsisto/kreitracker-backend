/**
 * Module dependencies.
 */
var jwt    = require('jsonwebtoken');
var config = require('../config');

//var mongoose = require('mongoose');
//var Alarm = mongoose.model('Alarm');

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
		console.log('-------------------------------------------------------------------');
   		console.log(decoded);
		console.log('-------------------------------------------------------------------');
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

/*
 *  Alarms authorizations routing middleware
 */

exports.alarms = {
    hasAuthorization : function (req, res, next) {
	var alarms = require('../../app/controllers/alarms');

	console.log("dentro del auth my="+req.params.alarmId);
	
	alarms.alarmToReq(req,res,function () {
		console.log("dentro del auth my aaaaaa="+req.alarm);
		var tokenUserId = req.decoded.$__._id;
		if (tokenUserId != req.alarm.userId) {
			return res.status(403).send({ 
			success: false, 
			message: 'No authorized.' 
		   	});
		};
      		

		next();
		
		});	
	
	}

}

