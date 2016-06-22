var FCM = require('fcm').FCM;

var apiKey = process.env.fcm_key;
var fcm = new FCM(apiKey);




/**
 *  Show all users
 */
exports.sendNotification = function(deviceId, data ) {
	
    var message = {
        registration_id: deviceId, // required
        collapse_key: 'COLLAPSE', // Send always with the same Id, so if many notifications are sent, the user only sees the last message. 
        'data.key1': data,
        'data.key2': 'value2'
    };

    fcm.send(message, function(err, messageId){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Sent with message ID: ", messageId);
        }
    }); 
};

/**
 *  Create an user
 */

exports.create = function(req, res) {
  	console.log('Post [users]');
	var user = new User(req.body);
   	user.provider = 'local';
        // save the tracker and check for errors
        user.save(function(err) {
        	if (err){
                	res.send(err);
			res.end();
		}else {
			//res.json({ message: 'User created!' });
		       res.json(user);
		}
	});
};


/**
 *  Delete all users
 */

exports.deleteAll = function(req, res) {
	console.log('Delete [users]');
	User.remove({
        //    _id: req.params.tracker_id
        }, function(err, user) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
};

/**
 *  Update user
*/
exports.update = function(req, res) {

  	console.log('Put [users:userId]');
	
	// use our user model to find the tracker we want
        User.findById(req.params.userId, function(err, user) {

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

  };

/**
 *  Show user
 */

exports.show =  function(req, res) {
  	console.log('Get [users:userId]');
	User.findById(req.params.userId, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
  };


/**
 *  Delete user
 */

exports.destroy =  function(req, res) {
  	console.log('Delete [users:userId]');

 	User.remove({
            _id: req.params.userId
        }, function(err, user) {
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

