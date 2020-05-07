"use strict";

var util = require('util');

var ig = require('./node-ig-api'); // Price Model. Output array of EPICs mutated for the IG API


var Market = require('../../models/Market');

var markets = Market.find({}).exec();
var items = markets.then(function (arr) {
  items = arr.map(function (_ref) {
    var epic = _ref.epic;
    return epic;
  });
  items.forEach(function (val, index) {
    items[index] = "CHART:".concat(val, ":1MINUTE");
  });
  return items;
});
var igConnection = new Promise(function (resolve, reject) {
  ig.initiateToken().then(function (res) {
    ig.login(true).then(function (r) {
      console.log(util.inspect(r.accountType, false, null));
      resolve(res);
    })["catch"](function (e) {
      return console.log(e);
    });
  })["catch"](function (err) {
    console.log("Error initiating token ", err);
    reject(err);
  });
});
igConnection.then(function (res) {
  // Subscribe to real-time data
  var subscriptionMode = 'MERGE'; //let items = ['CHART:IX.D.ASX.IFT.IP:1MINUTE','CHART:CS.D.AUDUSD.MINI.IP:1MINUTE'];

  var fields = ['LTV', 'TTV', 'UTM', 'DAY_OPEN_MID', 'DAY_NET_CHG_MID', 'DAY_PERC_CHG_MID', 'DAY_HIGH', 'DAY_LOW', 'OFR_OPEN', 'OFR_HIGH', 'OFR_LOW', 'OFR_CLOSE', 'BID_OPEN', 'BID_HIGH', 'BID_LOW', 'BID_CLOSE', 'LTP_OPEN', 'LTP_HIGH', 'LTP_LOW', 'LTP_CLOSE', 'CONS_END', 'CONS_TICK_COUNT'];
  ig.connectToLightstreamer();
  ig.subscribeToLightstreamer(subscriptionMode, items, fields, 0.5);
});
module.exports = igConnection;
//# sourceMappingURL=index.js.map