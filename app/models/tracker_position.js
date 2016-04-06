
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackerPositionSchema   = new Schema({
    trackerId: {
        type: Schema.ObjectId,
        ref: 'Tracker'
    },
    lat: String,
    lon: String,
    created_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('TrackerPosition', TrackerPositionSchema);
