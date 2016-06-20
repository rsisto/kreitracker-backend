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
	console.log('Registering user device');

    var device = new UserDevice(req.body);



    device.save(function(err){
        if(err){
            console.log('Error registering user device');
        }
    })
	
};

console.log('User Device controller registered');