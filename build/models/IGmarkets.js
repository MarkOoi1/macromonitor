"use strict";

var mongoose = require('mongoose');

var IGmarketsSchema = new mongoose.Schema({
  '_id': {
    type: Number
  },
  'tokens_exp': {
    type: String
  },
  'x-request-id': {
    type: String
  },
  'x-security-token': {
    type: String
  },
  'cst': {
    type: String
  },
  'lightstreamerEndpoint': {
    type: String
  },
  'currentAccountId': {
    type: String
  }
});
var IGmarkets = mongoose.model('IGmarkets', IGmarketsSchema);
module.exports = IGmarkets;
//# sourceMappingURL=IGmarkets.js.map