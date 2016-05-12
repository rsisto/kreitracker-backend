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
                  if (!/(.*~)/.test(file)) {	
                      require(newPath);
	          }

		
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

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// START THE GPS TRACKER SERVER
// =============================================================================

//##,imei:359710047037420,A;
var server = gpstracker.create().listen(1337, function(){
    console.log('listening your gps trackers on port', 1337);
});

var trackers = require('./app/controllers/trackers');

server.trackers.on("connected",trackers.connected);
//server.trackers.on("position",trackers.position);
/*
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
  */  
    //Configure the tracker to notify every 30 seconds.
    //
//});



