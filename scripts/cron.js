const express = require('express');
const cron = require("node-cron");
const axios = require("axios");

// Twitter scraping function (main)
function twitterscraper() {
    // Loop through profiles in DB and scrape each individually.
    // Retrieve keywords to search on.
    // Requires: mongo

}

// schedule tasks to be run on the server   
module.exports = {
    twitter: function(host,port,profile,interval) {
        // call twitterscraper() returns all profiles in an array
            // foreach profile
                // run axios
        cron.schedule("*/1 * * * *", function() {
        let apiurl = `http://${host}:${port}/api/twitterscraper?profile=${profile}&interval=${interval}`;
    
        console.log("---------------------");
        console.log("Running Cron Job: Twitter scraper on ",apiurl);
        
        let res = axios.get(apiurl);

        return res;
        })
    }
};

