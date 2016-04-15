/**
 * Module dependencies.
 */

exports.authentication = function(req, res) {
	console.log('auth');
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
	});
};


