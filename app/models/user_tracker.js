
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserTrackerSchema   = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    trackerId: {
        type: Schema.ObjectId,
        ref: 'Tracker'
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserTracker', UserTrackerSchema);
