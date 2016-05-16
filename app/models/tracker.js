
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackerSchema   = new Schema({
    name: String,
    imei: {
        type: String,
        unique: true,
	required: true
    },
    phone: {
        type: String,
        unique: true,
	required: true
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    }, 
    alarmId: {
        type: Schema.ObjectId,
        ref: 'Alarm'
    },
    created_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Tracker', TrackerSchema);
