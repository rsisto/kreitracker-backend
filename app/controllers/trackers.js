/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tracker = mongoose.model('Tracker'),
	TrackerPosition = mongoose.model('TrackerPosition'),
		Alarm = mongoose.model('Alarm')	
	;


/**
 *  Show all users
 */
exports.showAllAll = function(req, res) {
	console.log('Get [trackers]');
	Tracker.find(function(err, trackers) {
            if (err)
                res.send(err);
            res.json(trackers);
        });   
};

/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	tokenUserId = req.decoded.$__._id;
	// find each person with a last name matching 
	var query = Tracker.findOne({ 'userId': tokenUserId });
	// execute the query at a later time
	query.exec(function (err, trackers) {
	 	if (err)  res.send(err);
		if (trackers == null)
			trackers = []
		res.json(trackers);
	})

   
};

/**
 *  Create an tracker
 */

exports.create = function(req, res) {
  	console.log('Post [trackers]');
	var tracker = new Tracker(req.body);
	//tracker.userId = req.params.userId;
        // save the tracker and check for errors
        tracker.save(function(err) {
        	if (err){
                	res.send(err);
			res.end();
		}else {
			res.json(tracker);
		}
	});
};

/**
 *  Create an tracker in
 */

exports.createIn = function(req, res) {
  	console.log('Post [trackers]');
	var tracker = new Tracker(req.body);
	//tracker.userId = req.params.userId;
        // save the tracker and check for errors
        
	tracker.save(function(err) {
        	if (err){
                	//res.send(err);
			//res.end();
			console.log('create in tracker' + err);	
		}else {
			//res.json(tracker);
		}
	});
};




/**
 *  Delete all trackers
 */

exports.deleteAll = function(req, res) {
	console.log('Delete [trackers]');
	Tracker.remove({
        //    _id: req.params.tracker_id
        }, function(err, tracker) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
};

/**
 *  Update tracker
*/
exports.update = function(req, res) {

  	console.log('Put [trackers:trackerId]');
	
	// use our user model to find the tracker we want
        Tracker.findById(req.params.trackerId, function(err, tracker) {

            if (err)
                res.send(err);

            tracker.phone = req.body.phone;  // update the trackers info
	    tracker.alarmId = req.body.alarmId
	    // save the tracker
            tracker.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tracker updated!' });
            });

        });

  };

/**
 *  Show user
 */

exports.show =  function(req, res) {
  	console.log('Get [trackers:trackerId]');
	Tracker.findById(req.params.trackerId, function(err, tracker) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
  };


/**
 *  Fond by imei
 */

exports.findByImei =  function(imei) {
  	console.log('findByImei');
	var query = Person.findOne({ 'name.last': 'Ghost' });
	console.log('query');
        console.log(query);
	    
	   
        
  };



/**
 *  Delete user
 */

exports.destroy =  function(req, res) {
  	console.log('Delete [trackers:trackerId]');

 	Tracker.remove({
            _id: req.params.trackerId
        }, function(err, tracker) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
  };

/***********************************************************************
			GPS FUNCTIONS
**************************************************************************/

exports.connected = function(tracker){
    
    //Get the tracker or create it.
    Tracker.findOne({"imei":tracker.imei}).populate("alarmId").exec(function (err, trackerDb) 
    {
    if (trackerDb == null) {return;}
    if (err) return err;});

    tracker.on("position", function(position){
    console.log("tracker new position {" + tracker.imei +  "}: lat", 
                            position.lat, "lng", position.lng);
    //Create the tracker position.
    //Get the tracker or create it.
    Tracker.findOne({"imei":tracker.imei}, function(err, trackerDb) {
    if(trackerDb != null){
    //compare and push if alarm is true
    

    /* CHECKING ALARM, MOVEMENT AND DOING NOTIFICATION*/


    var trackerPositions = require('./trackerpositions');    
    Alarm.findById(trackerDb.alarmId, function(err, alarm) {
            if (err)
                res.send(err);
	    if (alarm.kOn){
		trackerPositions.showByTrackerIdAux(trackerDb.id,
			function (err, currPosition) {
			if (err)
		                //console.log("ERROR:"+err);
			
				console.log("currPosition.lon:"+currPosition.lon);
				console.log("position.lon:"+position.lng);
				console.log("currPosition.lat:"+currPosition.lat);
				console.log("position.lat:"+position.lat);


				if (currPosition.lon != position.lng || currPosition.lat != position.lat)  {
					//hey! that's my car!!
					console.log("TRIGGER THE ALARM!!");
					alarm.triggered = true;

					alarm.save(function(err) {})



				}
			
			}
		)
	     }
    });

    //console.log("-------------- saving ----------------");
    var pos = new TrackerPosition(); 
    pos.lat = position.lat;
    pos.lon = position.lng;
    pos.trackerId = trackerDb._id;
    // save the tracker and check for errors
    pos.save(function(err) {
	    if(err!=null)
		console.log("Error storing tracker position " + err);
	    });
		console.log("Track position stored for imei [" + tracker.imei +  "] ");
	    }else{
		console.log("tracker for imei {" + tracker.imei +  "}: not registered");
	    }
    });
    });
 }

