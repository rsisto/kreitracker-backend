/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Alarm = mongoose.model('Alarm');



/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	console.log('Get [alarms]');
	Alarm.find(function(err, alarms) {
            if (err)
                res.send(err);
            res.json(alarms);
        });   
};

/**
 *  Create an tracker
 */

exports.create = function(req, res) {
  	console.log('Post [alarms]');
	var alarm = new Alarm();
	alarm.userId = req.params.userId;
	alarm.name = req.body.name;
	alarm.description = req.body.description;
        alarm.kOn = false;
        // save the tracker and check for errors
        alarm.save(function(err) {
        	if (err){
                	res.send(err);
			res.end();
		}else {
			//res.json({ message: 'User created!' });
		       res.json(alarm);
		}
	});
};


/**
 *  Delete all trackers
 */

exports.deleteAll = function(req, res) {
	console.log('Delete [alarms]');
	Alarm.remove({
        //    _id: req.params.tracker_id
        }, function(err, alarm) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
};

/**
 *  Update
*/
exports.update = function(req, res) {

  	console.log('Put [alarms:alarmId]');
	
	// use our user model to find the tracker we want
        Alarm.findById(req.params.alarmId, function(err, alarm) {

            if (err)
                res.send(err);

            alarm.phone = req.body.phone;  // update the trackers info

	    // save the tracker
            alarm.save(function(err) {
                if (err)
                    res.send(err);
		res.json({ message: 'Alarm updated!' });
            });

        });

  };

/**
 *  Show
 */

exports.show =  function(req, res) {
  	console.log('Get [alarms:alarmId]');
	Alarm.findById(req.params.alarmId, function(err, alarm) {
            if (err)
                res.send(err);
            res.json(alarm);
        });
  };


/**
 *  Delete user
 */

exports.destroy =  function(req, res) {
  	console.log('Delete [alarms:alarmId]');

 	Alarm.remove({
            _id: req.params.alarmId
        }, function(err, alarm) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
  };


/**
 *  Create an tracker
 */

exports.turnOn = function(req, res) {
  	console.log('turn on [alarms]');

	Alarm.findById(req.params.alarmId, function(err, alarm) {
            if (err)
                res.send(err);

	    alarm.kOn = true;
		
            // save the tracker
            alarm.save(function(err) {
                if (err)
                    res.send(err);
		res.json({ message: 'Alarm updated!' });
            });
        });


};

exports.alarmToReq = function(req,res,next) {
	Alarm.findById(req.params.alarmId, function(err,alarm) {
            if (err)
		res.send(err);
	     req.alarm = alarm
	     next()
        });
};










