// This model is used to store android and ios device tokens for push notifications.
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserDeviceSchema   = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    deviceId:{
        type: String,
        required: true,
    },
    //ios, android
    deviceType:{
        type: String,
        required: true,
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserDevice', UserDeviceSchema);
