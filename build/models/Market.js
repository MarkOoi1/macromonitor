"use strict";

var mongoose = require('mongoose');

var MarketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  epic: {
    type: String
  }
});
var Market = mongoose.model('Market', MarketSchema);
module.exports = Market;
//# sourceMappingURL=Market.js.map