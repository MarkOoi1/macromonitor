const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
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
    }
});

const Market = mongoose.model('Market', MarketSchema);

module.exports = Market;