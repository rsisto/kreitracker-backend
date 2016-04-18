// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var fs = require('fs');
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var gpstracker = require('gpstracker');
var passport = require('passport');

//?? no se que es esto @JM
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var morgan      = require('morgan');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());





// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;        // set our port
var mongoose   = require('mongoose');
var config = require('./config/config');
var auth = require('./config/middlewares/authorization');
mongoose.connect(config.database); // connect to our database
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//Bootstrap models

var models_path = __dirname + '/app/models';


var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


app.use('/api', router);


//bootstrap passport config
require('./config/passport')(passport);

//Bootstrap routes
require('./config/routes')(router, passport, auth);

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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api



/*

// =============================================================================
// USERS
// =============================================================================

// GET
router.get('/users',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [users]');
	User.find(function(err, users) {
            if (err)
                res.send(err);
	    //res.json({ message: 'All users!' });
            res.json(users);
        });
  });

// POST
router.post('/users',
  //passport.authenticate('local'),

// =============================================================================
// USERS/:ID
// =============================================================================

// GET
router.get('/users/:user_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [users:user_id]');
	User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
  });
// PUT
router.put('/users/:user_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Put [users:user_id]');
	
	// use our user model to find the tracker we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the trackers info

	    // save the tracker
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });

  });

// DELETE
router.delete('/users/:user_id',
  passport.authenticate('local'),
  
// =============================================================================
// TRACKERS
// =============================================================================

// GET
router.get('/trackers',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [trackers]');
        Tracker.find(function(err, trackers) {
            if (err)
                res.send(err);
            res.json(trackers);
        });
  });

// POST
router.post('/trackers',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Post [trackers]');
	
 	var tracker = new Tracker();      // create a new instance of the Tracker model
        tracker.name = req.body.name;  // set the trackers name (comes from the request)
        tracker.imei = req.body.imei;
        tracker.phone = req.body.phone;
        // save the tracker and check for errors
        tracker.save(function(err) {
            if (err)
                res.send(err);
            //res.json({ message: 'Tracker created!' });
	    res.json(tracker);
        });
  });

// DELETE
router.delete('/trackers',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Delete [trackers]');
	Tracker.remove({
        //    _id: req.params.tracker_id
        }, function(err, tracker) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

  });


// =============================================================================
// TRACKERS/:ID
// =============================================================================

// GET
router.get('/trackers/:tracker_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [trackers:tracker_id]');
	Tracker.findById(req.params.tracker_id, function(err, tracker) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
  });
// PUT
router.put('/trackers/:tracker_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Put [trackers:tracker_id]');
	
	// use our user model to find the tracker we want
        Tracker.findById(req.params.tracker_id, function(err, tracker) {

            if (err)
                res.send(err);

            tracker.phone = req.body.phone;  // update the trackers info

	    // save the tracker
            tracker.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Tracker updated!' });
            });

        });

  });

// DELETE
router.delete('/trackers/:tracker_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Delete [trackers:tracker_id]');

 	Tracker.remove({
            _id: req.params.tracker_id
        }, function(err, tracker) {
            if (err)
                res.send(err);
	    //res.json(err);	
            res.json({ message: 'Successfully deleted' });
        });
  });


// =============================================================================
// TRACKERSPOSITION

// =============================================================================

// GET
router.get('/trackerpositions',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [trackerpositions]');
        TrackerPosition.find(function(err, trackerpositions) {
            if (err)
                res.send(err);
            res.json(trackerpositions);
        });
  });

// DELETE
router.delete('/trackerpositions',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Delete [trackerpositions]');
	TrackerPosition.remove({
        //    _id: req.params.tracker_id
        }, function(err, trackerposition) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

  });

// =============================================================================
// TRACKERSPOSITION/:TRACKERID
// =============================================================================


// GET
//return the last trackerposition register
router.get('/trackers/:tracker_id/trackerpositions',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [/trackers/:tracker_id/trackerpositions]');
	TrackerPosition.findOne	({"trackerId": req.params.tracker_id},{}, { sort: { 'created_at' : -1 } } ,function(err, tracker) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
  });


// POST
router.post('/trackers/:tracker_id/trackerpositions',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Get [trackerpositions:tracker_id]');
	
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

// =============================================================================
// USERTRACKER/:USERID/:TRACKERID
// =============================================================================

// POST
router.post('/usertrackers/:user_id/:tracker_id',
  passport.authenticate('local'),
  function(req, res) {
  	console.log('Post [usertrackers:user_id:tracker_id]');
	
	var utra = new UserTracker();      // create a new instance of the Tracker model
        utra.trackerId = req.params.user_id;  // set the users (comes from the request)
        utra.userId = req.params.tracker_id;  // set the trackers (comes from the request)
        
        // save the tracker and check for errors
        utra.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User Tracker created!' });
        });
   });

*/

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

/*

// START THE GPS TRACKER SERVER
// =============================================================================

var server = gpstracker.create().listen(1337, function(){
    console.log('listening your gps trackers on port', 1337);
});

//Initializing logger
//logger.init(passport);

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
*/
