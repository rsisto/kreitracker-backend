
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackerPositionSchema   = new Schema({
    trackerId: String,
    lat: String,
    lon: String,
    created_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('TrackerPosition', TrackerPositionSchema);