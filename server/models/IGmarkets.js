const mongoose = require('mongoose');

const IGmarketsSchema = new mongoose.Schema({
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

const IGmarkets = mongoose.model('IGmarkets', IGmarketsSchema);

module.exports = IGmarkets;