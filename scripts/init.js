/****** **** **** **** **** 
 * Populate the database documents and relationships.
 * Market, Component, Region and config settings
*/

const mongoose = require('mongoose');

// DB Config
const db = require('../config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`MongoDB connected for ${__filename}...`))
    .catch(err => console.log(err));

// Load Models: Market, Component, Region, Keyword
var Market = require('../models/Market');
var Component = require('../models/Component');
var Region = require('../models/Region');


// Add market ids to objects that relate to that market. Eg. Add AUDUSD to Australia to describe Australia's influence on the AUDUSD market.
function addMarketids( name, marketObjId, objArr ) {
    for (var i in objArr) {
    if (objArr[i].name == name) {
        objArr[i].market_ids.push(marketObjId);
        break; //Stop this loop, we found it!
    }
    }
}

// Markets: Load up the pre-defined data
var marketsArr = [
    {name: 'ASX200', type: 'Equities', description: ''},
    {name: 'Dow30', type: 'Equities', description: ''},
    {name: 'S&P500', type: 'Equities', description: ''},
    {name: 'Spot Gold', type: 'Commodities', description: ''},
    {name: 'Brent Oil', type: 'Commodities', description: ''},
    {name: 'Crude Oil', type: 'Commodities', description: ''},
    {name: 'EURUSD', type: 'FX', description: ''},
    {name: 'GBPUSD', type: 'FX', description: ''},
    {name: 'AUDUSD', type: 'FX', description: ''},
    {name: 'USDJPY', type: 'FX', description: ''},
    {name: 'EURJPY', type: 'FX', description: ''},
    {name: 'AUDJPY', type: 'FX', description: ''}
];

// Markets: Loop through array and save to DB.
marketsArr.forEach(e => {
    Market.findOne({ name: e.name})
        .then(market => {
            if(market) {
                console.log('Market already exists');
            } else {
                let newMarket = new Market({
                    name: e.name,
                    type: e.type,
                    description: e.description
                });
                console.log(`${e.name} saved`);
                newMarket.save();
            }
        });
});

// Components: Load up the pre-defined data
const componentsArr = [
    {name: 'Economy', description: ''},
    {name: 'Geopolitics', description: ''},
    {name: 'Left-field Threat', description: ''},
    {name: 'Earnings', description: ''}
];


// Components: Loop through array and save to DB.
componentsArr.forEach(e => {
    Component.findOne({ name: e.name})
        .then(component => {
            if(component) {
                console.log('Component already exists');
            } else {
                let newComponent = new Component({
                    name: e.name,
                    description: e.description
                });
                console.log(`${e.name} saved`);
                newComponent.save();
            }
        });
});


// ------------------------------------
// Region: Load up the pre-defined data
var regionArr = [
    {name: 'Australia', market_ids: [], keywords: ['RBA','Lowe','Morrison','Australia']},
    {name: 'USA', market_ids: [], keywords: ['Powell','Williams','Clarida','Bowman','Brainard','Quarles','Harker','Mester','Kashkari','Kaplan','Rosengren','George','Bullard','Evans','Strine','Fed Reserve']},
    {name: 'Europe', market_ids: [], keywords: ['Germany','France','Italy','ECB','Lagarde']},
    {name: 'UK', market_ids: [], keywords: ['UK','Boris','Boris Johnson','Sunak ','Raab','Michael Gove']}
];

// Region: Add market_ids to regionArr. It's all about what Regions influence a Market, not the other way around.
newRegionArr = Market.find()
    .then(res => {
        res.forEach(market => {
            // ------------
            // Uncomment the console.log's for a visual structure of the Region/Market relationships 
            // ------------

            //console.log(`${market.name} is influenced by the following regions:`);
            switch(market.name) {
                case 'ASX200':
                    //console.log(' Australia');
                    addMarketids('Australia',market._id,regionArr);
                    break;
                case 'AUDUSD':
                    //console.log(' Australia');
                    addMarketids('Australia',market._id,regionArr);
                    break;
                case 'AUDJPY':
                    //console.log(' Australia');
                    addMarketids('Australia',market._id,regionArr);
                    break;
                case 'GBPUSD':
                    //console.log(' UK');
                    addMarketids('UK',market._id,regionArr);
                    break;
            }
            // All markets are influenced by Region = USA, Europe
            //console.log(' Europe');
            addMarketids('Europe',market._id,regionArr);
            //console.log(' USA');
            addMarketids('USA',market._id,regionArr);
            
        });
        
    })
    .then(done => {
        // Regions: The market_ids are stored in the array and it is now ready to save to db
        regionArr.forEach(e => {
            Region.findOne({ name: e.name})
                .then(region => {
                    if(region) {
                        console.log('Region already exists');
                    } else {
                        let newRegion = new Region({
                            name: e.name,
                            market_ids: e.market_ids,
                            keywords: e.keywords
                        });
                        console.log(`${e.name} saved`);
                        newRegion.save();
                    }
                });
        });
        return regionArr;
    })
    .catch(err => console.log(err));
