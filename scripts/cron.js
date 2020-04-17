const express = require('express');
const cron = require("node-cron");
const axios = require("axios");

/*****
 * Twitter scraping variables
 * 
 * TODO: Retrieve Twitter profiles from DB
 */
console.log("Initiating CRON: Twitter scraping...");

var Region = require('../models/Region');

let keywords;
let profiles = ['ForexLive', 'LiveSquawk'];
let interval = 120000; // Every minute + slippage

Region.find({},'keywords')
    .distinct('keywords', function(err, results){
        if(err) {
            return console.error(err);
        } else {
            console.log("Keywords found");
        }
    })
    .exec()
    .then(res => {
        keywords = res;
    });


/***** ***** ***** ***** ***** *****
 * Cron handler
 * 
 */


// schedule tasks to be run on the server   
module.exports = {
    twitter: function(host,port) {
        
        cron.schedule("*/1 * * * *", function() {

            let apiurl = `http://${host}:${port}/api/twitterscraper?profile=${encodeURIComponent(JSON.stringify(profiles))}&interval=${interval}&keywords=${encodeURIComponent(JSON.stringify(keywords))}`;
    
            console.log("---------------------");
            //console.log("Running Cron Job: Twitter scraper on ",apiurl);
            
            let res = axios.get(apiurl);

            return res;
        })
    }
};

