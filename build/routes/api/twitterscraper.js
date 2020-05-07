"use strict";

var express = require('express');

var router = express.Router();

var axios = require("axios");

var cheerio = require('cheerio'); // Load News Model


var News = require('../../models/Event');

var Region = require('../../models/Region'); // Retrieve user accounts to scrape
// Save tweets with keywords in respective Collection
// @route   GET custom_modules/twitter-scraper
// @desc    Get latest tweets
// @access  Private
// @params  ?profile=[Twitter username]&interval={milliseconds}&keywords=[]


router.get('/', function (req, res) {
  var profile = JSON.parse(decodeURIComponent(req.query.profile));
  var currTime = new Date().getTime();
  var interval = currTime - req.query.interval;
  var keywords = JSON.parse(decodeURIComponent(req.query.keywords));
  profile.forEach(function (val) {
    var URL = "https://twitter.com/" + val;
    console.log('Scanning ', URL);
    var newNewsItems = []; // Collect 

    axios.get(URL).then(function (response) {
      var $ = cheerio.load(response.data); //loading content of HTML body

      $('li.stream-item').each(function (index) {
        var name = $(this).find('.fullname').text();
        var date = $(this).find('.tweet-timestamp').find('span').data('time') * 1000; // Convert seconds to milliseconds

        var tweet = $(this).find('p.tweet-text').text();
        var newNews = new News({
          type: 'News',
          profile: name,
          content: tweet,
          keywords: [],
          date: date
        }); // Add to array if within interval

        if (date > interval) newNewsItems.push(newNews);
      });
      console.log("total: ", newNewsItems.length);
      return newNewsItems;
    }).then(function (foundNews) {
      var filteredList = [];
      foundNews.filter(function (value) {
        return keywords.some(function (word) {
          if (value.content.includes(word)) {
            value.keywords.push(word);
            filteredList.push(value);
            return true;
          } else {
            return false;
          }
        });
      });
      console.log("filtered: ", filteredList.length);
      return filteredList;
    }).then(function (_final) {
      console.log("new: ", _final.length);

      _final.forEach(function (e) {
        News.findOne({
          date: e.date
        }).then(function (news) {
          if (news) {
            console.log('tweet already saved');
          } else {
            console.log('saved item'); // Sanitise content (strip hrefs) for ForexLive.
            // TODO: Custom santisation needs to be dynamic, not hardcoded.

            if (e.profile == "ForexLive" || e.profile == "CNBC") e.content = e.content.split("http", 1);
            e.save();
          }
        });
      });
    });
  });
  res.send("Scrape complete");
});
module.exports = router;
//# sourceMappingURL=twitterscraper.js.map