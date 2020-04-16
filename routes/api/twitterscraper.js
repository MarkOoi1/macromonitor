const express = require('express');
const router = express.Router();

const axios = require("axios");
const cheerio = require('cheerio');

// Load News Model
var News = require('../../models/News');

// Retrieve user accounts to scrape
// Retrieve keywords to search for
// Save tweets with keywords in respective Collection

// Get profile to scrape from the command line (if required)

// @route   GET custom_modules/twitter-scraper
// @desc    Get latest tweets
// @access  Private
// @params  ?profile={Twitter username}&interval={milliseconds}
router.get('/', (req,res) => {
    var profile = req.query.profile;
    var URL = "https://twitter.com/" +profile;
    
    var currTime = new Date().getTime();
    var interval = currTime- req.query.interval;
    
    // Get keyword list
    const fx = ['GBPUSD','AUDUSD','EURUSD', 'USDCAD', 'Australia'];
    
    console.log('Scanning ',URL);
    var newNewsItems = [];
    
    // Collect 
    axios.get(URL).then(function(response) {
        let $ = cheerio.load(response.data);  //loading content of HTML body
    
        $('li.stream-item').each(function(index){
            var name = $(this).find('.fullname').text();
            var date = $(this).find('.tweet-timestamp').find('span').data('time') *1000; // Convert seconds to milliseconds
            var tweet = $(this).find('p.tweet-text').text();
    
            var newNews = new News({
                title: name,
                content: tweet,
                date: date
            });
            
            // Add to array if within interval
            if(date > interval) newNewsItems.push(newNews);
        });
        console.log("total: ",newNewsItems.length);
        return newNewsItems;
    })
    .then(foundNews => {
        var filteredList = foundNews
            .filter(value => fx
                .some(word => value.content.includes(word))
            );
        console.log("filtered: ",filteredList.length);
        return filteredList;
        })
        .then(final => {
            console.log("new: ",final.length);
            final.forEach(e => {
                News.findOne({ date: e.date})
                    .then(news => {
                        if(news) {
                            console.log('tweet already saved');
                        } else {
                            console.log('saved item');
                            e.save();
                        }
                    });
            });
        });
    res.send("Scrape complete");
});

module.exports = router;