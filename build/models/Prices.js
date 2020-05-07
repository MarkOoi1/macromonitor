"use strict";

var mongoose = require('mongoose');

var PricesSchema = new mongoose.Schema({
  'epic_settings': {
    type: String
  },
  'LTV': {
    type: Number
  },
  'TTV': {
    type: Number
  },
  'UTM': {
    type: Number
  },
  'DAY_OPEN_MID': {
    type: Number
  },
  'DAY_NET_CHG_MID': {
    type: Number
  },
  'DAY_PERC_CHG_MID': {
    type: Number
  },
  'DAY_HIGH': {
    type: Number
  },
  'DAY_LOW': {
    type: Number
  },
  'OFR_OPEN': {
    type: Number
  },
  'OFR_HIGH': {
    type: Number
  },
  'OFR_LOW': {
    type: Number
  },
  'OFR_CLOSE': {
    type: Number
  },
  'BID_OPEN': {
    type: Number
  },
  'BID_HIGH': {
    type: Number
  },
  'BID_LOW': {
    type: Number
  },
  'BID_CLOSE': {
    type: Number
  },
  'LTP_OPEN': {
    type: Number
  },
  'LTP_HIGH': {
    type: Number
  },
  'LTP_LOW': {
    type: Number
  },
  'LTP_CLOSE': {
    type: Number
  },
  'CONS_END': {
    type: Boolean
  },
  'CONS_TICK_COUNT': {
    type: Number
  },
  'minute': {
    type: Number
  }
});
var Prices = mongoose.model('Prices', PricesSchema);
module.exports = Prices;
//# sourceMappingURL=Prices.js.map