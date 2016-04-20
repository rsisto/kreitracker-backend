/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    UserTracker = mongoose.model('AlarmTracker');


/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	console.log('Get [alarmtrackers]');
	AlarmTracker.find(function(err, alarmtrackers) {
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
  	console.log('Post [alarmtrackers:alarmId:trackerId]');
	var atra = new AlarmTracker();      // create a new instance of the Tracker model
        atra.trackerId = req.params.userId;  // set the users (comes from the request)
        atra.alarmId = req.params.alarmId;  // set the trackers (comes from the request)
        // save the tracker and check for errors
        atra.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Alarm Tracker created!' });
        });
  
};


