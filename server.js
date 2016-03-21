// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var gpstracker = require('gpstracker')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kreitracker'); // connect to our database
var Tracker     = require('./app/models/tracker');
var TrackerPosition     = require('./app/models/tracker_position');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/trackers')

    // create a tracker (accessed at POST http://localhost:8080/api/trackers)
    .post(function(req, res) {
        var tracker = new Tracker();      // create a new instance of the Tracker model
        tracker.name = req.body.name;  // set the trackers name (comes from the request)
        tracker.imei = req.body.imei;
        tracker.phone = req.body.phone;
        // save the tracker and check for errors
        tracker.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Tracker created!' });
        });
        
    })
    .get(function(req, res) {
        Tracker.find(function(err, trackers) {
            if (err)
                res.send(err);

            res.json(trackers);
        });
    });

// on routes that end in /trackers/:tracker_id
// ----------------------------------------------------
router.route('/trackers/:tracker_id')

    // get the tracker with that id (accessed at GET http://localhost:8080/api/trackers/:tracker_id)
    .get(function(req, res) {
        Tracker.findById(req.params.tracker_id, function(err, tracker) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
    })
    // update the tracker with this id (accessed at PUT http://localhost:8080/api/trackers/:tracker_id)
    .put(function(req, res) {

        // use our tracker model to find the tracker we want
        Tracker.findById(req.params.tracker_id, function(err, tracker) {

            if (err)
                res.send(err);

            tracker.name = req.body.name;  // update the trackers info

            // save the tracker
            tracker.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tracker updated!' });
            });

        });
    })
    // delete the tracker with this id (accessed at DELETE http://localhost:8080/api/trackers/:tracker_id)
    .delete(function(req, res) {
        Tracker.remove({
            _id: req.params.tracker_id
        }, function(err, tracker) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


router.route('/trackerpositions/:tracker_id')
    // get the tracker position 
    .get(function(req, res) {
        TrackerPosition.findOne	({"trackerId": req.params.tracker_id},{}, { sort: { 'created_at' : -1 } } ,function(err, tracker) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
    })
    .post(function(req, res) {
        var tpos = new TrackerPosition();      // create a new instance of the Tracker model
        tpos.trackerId = req.params.tracker_id;  // set the trackers name (comes from the request)
        tpos.lat = req.body.lat;
        tpos.lon = req.body.lon;

        // save the tracker and check for errors
        tpos.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Tracker Position created!' });
        });
        
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


// START THE GPS TRACKER SERVER
// =============================================================================

var server = gpstracker.create().listen(1337, function(){
    console.log('listening your gps trackers on port', 1337);
});

server.trackers.on("connected", function(tracker){
    
    //Get the tracker or create it.
    Tracker.findOne({"imei":tracker.imei}, function(err, trackerDb) {
    	if (err)
            console.log("Error finding tracker by imei " + tracker.imei + " " + err);
        if(trackerDb == null){
        	var trackerDb = new Tracker();      // create a new instance of the Tracker model
	        trackerDb.imei = tracker.imei;
	        // save the tracker and check for errors
	        trackerDb.save(function(err) {
	            if (err)
	                console.log("Error storing Tracker " + tracker.imei);
	            else
	            	console.log("Tracker created for imei ["+tracker.imei+"] with id ["+trackerDb._id+"]" );
	        });
        }
    });
    console.log("tracker connected with imei:", tracker.imei);


    //Event called when GPS tracker sends position update.
    tracker.on("position", function(position){
        console.log("tracker new position {" + tracker.imei +  "}: lat", 
                            position.lat, "lng", position.lng);
        //Create the tracker position.
        //Get the tracker or create it.
	    Tracker.findOne({"imei":tracker.imei}, function(err, trackerDb) {
	    	//If tracker is null, don't log anything
	    	if(trackerDb != null){
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
    
    //Configure the tracker to notify every 30 seconds.
    tracker.trackEvery(30).seconds();
});