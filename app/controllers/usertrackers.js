/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    UserTracker = mongoose.model('UserTracker');


/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	console.log('Get [usertrackers]');
	UserTracker.find(function(err, usertrackers) {
            if (err)
                res.send(err);
            res.json(usertrackers);
        });   
};

/**
 *  Create an user
 */

exports.create = function(req, res) {
  	// POST
  	console.log('Post [usertrackers:user_id:tracker_id]');
	var utra = new UserTracker();      // create a new instance of the Tracker model
        utra.trackerId = req.params.userId;  // set the users (comes from the request)
        utra.userId = req.params.trackerId;  // set the trackers (comes from the request)
        // save the tracker and check for errors
        utra.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User Tracker created!' });
        });
  
};


