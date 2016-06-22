/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    UserDevice = mongoose.model('UserDevice');


/**
 *  Register device id for this user, so we can send push notifications.
 */
exports.register = function(req, res) {
	
    var device = new UserDevice(req.body);
    User.findOne({ 'username': req.body.username }, function (err, user) {
      device.userId = user;
      console.log("user" + user);
      console.log('Registering user device');
      console.log(device);
      device.save(function(err){
        if(err){
            console.log('Error registering user device');
        }
        });
    })
    



    
	
};

