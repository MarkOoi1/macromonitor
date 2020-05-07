"use strict";

var express = require('express');

var cron = require("node-cron");

var axios = require("axios");
/*****
 * Twitter scraping variables
 * 
 * TODO: Retrieve Twitter profiles from DB
 */


console.log("Initiating CRON: Twitter scraping...");

var Region = require('../models/Region');

var keywords; // TODO: Save Twitter profiles, interval in db to manage via an interface.

var profiles = ['ForexLive', 'LiveSquawk']; //let interval = 1200000000; // Every minute + slippage

var interval = 120000; // Every minute + slippage

Region.find({}, 'keywords').distinct('keywords', function (err, results) {
  if (err) {
    return console.error(err);
  } else {
    console.log("Keywords found");
  }
}).exec().then(function (res) {
  keywords = res;
})["catch"](function (err) {
  return console.log(err);
});
/***** ***** ***** ***** ***** *****
 * Cron handler
 * Schedule tasks to be run on the server  
 */

module.exports = {
  twitter: function twitter(host, port) {
    cron.schedule("*/1 * * * *", function () {
      var apiurl = "http://".concat(host, ":").concat(port, "/api/twitterscraper?profile=").concat(encodeURIComponent(JSON.stringify(profiles)), "&interval=").concat(interval, "&keywords=").concat(encodeURIComponent(JSON.stringify(keywords)));
      console.log("---------------------"); //console.log("Running Cron Job: Twitter scraper on ",apiurl);

      var res = axios.get(apiurl);
      return res;
    });
  }
};
//# sourceMappingURL=cron.js.map