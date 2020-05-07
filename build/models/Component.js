"use strict";

var mongoose = require('mongoose');

var ComponentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});
var Component = mongoose.model('Component', ComponentSchema);
module.exports = Component;
//# sourceMappingURL=Component.js.map