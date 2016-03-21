
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackerSchema   = new Schema({
    name: String,
    imei: String,
    phone: String

});

module.exports = mongoose.model('Tracker', TrackerSchema);