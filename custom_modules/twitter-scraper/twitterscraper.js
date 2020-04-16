const axios = require("axios");
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// DB Config
const db = require('../../config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Load News Model
var News = require('../../models/News');

// Retrieve user accounts to scrape
// Retrieve keywords to search for
// Save tweets with keywords in respective Collection

// Get profile to scrape from the command line (if required)


// @route   GET custom_modules/twitter-scraper
// @desc    Get latest tweets
// @access  Private
// @params  [Twitter username] [Interval in milliseconds]
var userArgs = process.argv[2];
var URL = "https://twitter.com/" +userArgs;

var currTime = new Date().getTime();
var interval = currTime- process.argv[3];

// Get keyword list
const fx = ['GBPUSD','AUDUSD','EURUSD', 'USDCAD'];

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
    return newNewsItems;
})
.then(foundNews => {
    var filteredList = foundNews
        .filter(value => fx
            .some(word => value.content.includes(word))
        );
    return filteredList;
    })
    .then(final => {
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