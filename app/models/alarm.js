
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlarmSchema   = new Schema({
    name: String,
    description: String,
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    kOn: Boolean
});

module.exports = mongoose.model('Alarm', AlarmSchema);
