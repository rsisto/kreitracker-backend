
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlarmSchema   = new Schema({
    name: {
        type: String,
        unique: false,
	required: true
    },
    description: String,
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    kOn: Boolean,
    triggered: Boolean,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alarm', AlarmSchema);
