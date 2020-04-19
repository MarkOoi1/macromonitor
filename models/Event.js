const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    keywords: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;