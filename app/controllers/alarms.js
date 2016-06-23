/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Alarm = mongoose.model('Alarm'), trackers = require('./trackers');

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
 *  Create an alarm
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





exports.turn = function(req, res) {
  	

	console.log('turn [alarms]');



	console.log('******** req.decoded'+req.decoded.$__._id);

	userId = req.decoded.$__._id;

	Alarm.findOne({"userId":userId},{},{}, function(err, alarmDb) {

	console.log('******** id'+alarmDb);
	if (err) res.send(err);
	    alarmDb.kOn = !alarmDb.kOn;
	    if 	(!alarmDb.kOn) {
	    	alarmDb.triggered = false;
            }



            // save the tracker
            alarmDb.save(function(err) {
                if (err)
                    res.send(err);
		res.json({ kOn: 'Alarm updated!', kOn: alarmDb.kOn });
            });
	});

/*
	console.log('Get [trackerpositions:trackerId]');
	
	console.log('******** req.decoded'+req.decoded.$__);

	userId = req.decoded.$__._id;

	console.log('******** userId'+userId);

	
	Tracker.findOne({"userId":userId},{},{}, function(err, trackerDb) {

	console.log('******** id'+trackerDb);

	TrackerPosition.findOne({"trackerId": trackerDb._id},{}, { sort: { 'created_at' : -1 } } ,function(err, tp) {
	if (err)
                res.send(err);
	if (tp==null){
		console.log('es null');
		res.json({lat: 33,lon: 34})

	}else{

		console.log('tp'+tp);
		res.json({lat: tp.lat,lon: tp.lon})
	}        
	})
	})

*/
};


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

exports.turnOff = function(req, res) {
  	console.log('turn off [alarms]');

	Alarm.findById(req.params.alarmId, function(err, alarm) {
            if (err)
                res.send(err);

	    alarm.kOn = false;
		
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


/**
 *  Create the fisrt tracker
 */

exports.createFirstTracker = function(req, res) {
  	console.log('Post [alarms]');
	var alarm = new Alarm();
	alarm.userId = req.decoded.$__._id;
	alarm.name = "my first alarm";
	alarm.description = "my first alarm";
        alarm.kOn = true;
	alarm.triggered = false;
        // save the alaqrm and check for errors
        alarm.save(function(err) {
        	if (err){
                	res.send(err);
			res.end();
		}else {
			//now the tracker
			req.body.name = "my first tracker"
			req.body.alarmId = alarm._id
			req.body.userId = req.decoded.$__._id;
    			trackers.createIn(req,res)		
			res.json(alarm);
		}
	});




};








