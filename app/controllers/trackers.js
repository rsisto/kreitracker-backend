/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Tracker = mongoose.model('Tracker');


/**
 *  Show all users
 */
exports.showAll = function(req, res) {
	console.log('Get [trackers]');
	Tracker.find(function(err, trackers) {
            if (err)
                res.send(err);
            res.json(trackers);
        });   
};

/**
 *  Create an tracker
 */

exports.create = function(req, res) {
  	console.log('Post [trackers]');
	var tracker = new Tracker(req.body);

        // save the tracker and check for errors
        tracker.save(function(err) {
        	if (err){
                	res.send(err);
			res.end();
		}else {
			//res.json({ message: 'User created!' });
		       res.json(tracker);
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

