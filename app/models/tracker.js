
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TrackerSchema   = new Schema({
    name: String,
    imei: String,
    phone: String,
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Tracker', TrackerSchema);
