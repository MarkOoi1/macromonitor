"use strict";

var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
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
var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
//# sourceMappingURL=Event.js.map