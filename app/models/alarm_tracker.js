
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlarmTrackerSchema   = new Schema({
    alarmId: {
        type: Schema.ObjectId,
        ref: 'Alarm'
    },
    trackerId: {
        type: Schema.ObjectId,
        ref: 'Tracker'
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AlarmTracker', AlarmTrackerSchema);
