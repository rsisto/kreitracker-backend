/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    TrackerPosition = mongoose.model('TrackerPosition');


/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	console.log('Get [trackerpositions]');
	TrackerPosition.find(function(err, trackerpositions) {
            if (err)
                res.send(err);
            res.json(trackerpositions);
        });   
};

/**
 *  Create an tracker
 */

exports.create = function(req, res) {
  	console.log('Post [trackerpositions]');
	var tpos = new TrackerPosition();      // create a new instance of the Tracker model
        tpos.trackerId = req.params.trackerId;  // set the trackers name (comes from the request)
        tpos.lat = req.body.lat;
        tpos.lon = req.body.lon;

        // save the tracker and check for errors
        tpos.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Tracker Position created!' });
        });
        


  };


/**
 *  Delete all trackers
 */

exports.deleteAll = function(req, res) {
	console.log('Delete [trackers]');
	TrackerPosition.remove({
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

  	console.log('Put [trackerpositions:trackerPositionId]');
	
	// use our user model to find the tracker we want
        TrackerPosition.findById(req.params.trackerPositionId, function(err, tracker) {

            if (err)
                res.send(err);

            //trackerposition.phone = req.body.phone;  // update the trackers info

	    // save the tracker
            trackerposition.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'TrackerPosition updated!' });
            });

        });

  };

/**
 *  Show user
 */

exports.show =  function(req, res) {
  	console.log('Get [trackerpositions:trackerId]');
	TrackerPosition.findById(req.params.trackerPositionId, function(err, trackerposition) {
            if (err)
                res.send(err);
            res.json(tracker);
        });
  };


/**
 *  Delete user
 */

exports.destroy =  function(req, res) {
  	console.log('Delete [trackerpositions:trackerId]');

 	TrackerPosition.remove({
            _id: req.params.trackerPositionId
        }, function(err, tracker) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
  };




/**
 *  Show profile
 */
//exports.show = function(req, res) {
//    var user = req.profile;

//    res.render('users/show', {
//        title: user.name,
//        user: user
//    });
//};



/**
 * Auth callback
 */
//exports.authCallback = function(req, res, next) {
//    res.redirect('/');
//};

/**
 * Show login form
 */
//exports.signin = function(req, res) {
//    res.render('users/signin', {
//        title: 'Signin',
//        message: req.flash('error')
//    });
//};

/**
 * Show sign up form
 */
//exports.signup = function(req, res) {
//    res.render('users/signup', {
//        title: 'Sign up',
//        user: new User()
//    });
//};

/**
 * Logout
 */
//exports.signout = function(req, res) {
//    req.logout();
//    res.redirect('/');
//};

/**
 * Session
 */
//exports.session = function(req, res) {
//    res.redirect('/');
//};

/**
 * Create user
 */

/*
exports.create = function(req, res) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
//            return res.render('users/signup', {
//                errors: err.errors,
//                user: user
//            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

*/



/**
 *  Show profile
 */
//exports.show = function(req, res) {
//    var user = req.profile;

//    res.render('users/show', {
//        title: user.name,
//        user: user
//    });
//};

/**
 * Send User
 */
//exports.me = function(req, res) {
//    res.jsonp(req.user || null);
//};

/**
 * Find user by id
 */
/*
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

*/
