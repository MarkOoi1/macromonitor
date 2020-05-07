"use strict";

/****** **** **** **** **** 
 * Populate the database documents and relationships.
 * Market, Component, Region and config settings
*/
var mongoose = require('mongoose'); // DB Config


var db = require('../config/keys').mongoURI; // Connect to Mongo


mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("MongoDB connected for ".concat(__filename, "..."));
})["catch"](function (err) {
  return console.log(err);
}); // Load Models: Market, Component, Region, Keyword

var Market = require('../models/Market');

var Component = require('../models/Component');

var Region = require('../models/Region'); // Add market ids to objects that relate to that market. Eg. Add AUDUSD to Australia to describe Australia's influence on the AUDUSD market.


function addMarketids(name, marketObjId, objArr) {
  for (var i in objArr) {
    if (objArr[i].name == name) {
      objArr[i].market_ids.push(marketObjId);
      break; //Stop this loop, we found it!
    }
  }
} // Markets: Load up the pre-defined data


var marketsArr = [{
  name: 'ASX200',
  type: 'Equities',
  description: '',
  epic: 'IX.D.ASX.IFT.IP'
}, {
  name: 'Dow30',
  type: 'Equities',
  description: '',
  epic: 'IX.D.DOW.IFA.IP'
}, {
  name: 'S&P500',
  type: 'Equities',
  description: '',
  epic: 'IX.D.SPTRD.IFA.IP'
}, {
  name: 'Spot Gold',
  type: 'Commodities',
  description: '',
  epic: 'CS.D.CFAGOLD.CFA.IP'
}, {
  name: 'Brent Oil',
  type: 'Commodities',
  description: '',
  epic: 'CC.D.LCO.UMA.IP'
}, {
  name: 'Crude Oil',
  type: 'Commodities',
  description: '',
  epic: 'CC.D.CL.UMA.IP'
}, {
  name: 'EURUSD',
  type: 'FX',
  description: '',
  epic: 'CS.D.EURUSD.MINI.IP'
}, {
  name: 'GBPUSD',
  type: 'FX',
  description: '',
  epic: 'CS.D.GBPUSD.MINI.IP'
}, {
  name: 'AUDUSD',
  type: 'FX',
  description: '',
  epic: 'CS.D.AUDUSD.MINI.IP'
}, {
  name: 'USDJPY',
  type: 'FX',
  description: '',
  epic: 'CS.D.USDJPY.MINI.IP'
}, {
  name: 'EURJPY',
  type: 'FX',
  description: '',
  epic: 'CS.D.EURJPY.MINI.IP'
}, {
  name: 'AUDJPY',
  type: 'FX',
  description: '',
  epic: 'CS.D.AUDJPY.MINI.IP'
}]; // Markets: Loop through array and save to DB.

marketsArr.forEach(function (e) {
  Market.findOne({
    name: e.name
  }).then(function (market) {
    if (market) {
      console.log('Market already exists');
    } else {
      var newMarket = new Market({
        name: e.name,
        type: e.type,
        description: e.description
      });
      console.log("".concat(e.name, " saved"));
      newMarket.save();
    }
  });
}); // Components: Load up the pre-defined data

var componentsArr = [{
  name: 'Economy',
  description: ''
}, {
  name: 'Geopolitics',
  description: ''
}, {
  name: 'Left-field Threat',
  description: ''
}, {
  name: 'Earnings',
  description: ''
}]; // Components: Loop through array and save to DB.

componentsArr.forEach(function (e) {
  Component.findOne({
    name: e.name
  }).then(function (component) {
    if (component) {
      console.log('Component already exists');
    } else {
      var newComponent = new Component({
        name: e.name,
        description: e.description
      });
      console.log("".concat(e.name, " saved"));
      newComponent.save();
    }
  });
}); // ------------------------------------
// Region: Load up the pre-defined data

var regionArr = [{
  name: 'Australia',
  market_ids: [],
  keywords: ['RBA', 'Lowe', 'Morrison', 'Australia']
}, {
  name: 'USA',
  market_ids: [],
  keywords: ['Powell', 'Williams', 'Clarida', 'Bowman', 'Brainard', 'Quarles', 'Harker', 'Mester', 'Kashkari', 'Kaplan', 'Rosengren', 'George', 'Bullard', 'Evans', 'Strine', 'Fed Reserve']
}, {
  name: 'Europe',
  market_ids: [],
  keywords: ['Germany', 'France', 'Italy', 'ECB', 'Lagarde']
}, {
  name: 'UK',
  market_ids: [],
  keywords: ['UK', 'Boris', 'Boris Johnson', 'Sunak ', 'Raab', 'Michael Gove']
}]; // Region: Add market_ids to regionArr. It's all about what Regions influence a Market, not the other way around.

newRegionArr = Market.find().then(function (res) {
  res.forEach(function (market) {
    // ------------
    // Uncomment the console.log's for a visual structure of the Region/Market relationships 
    // ------------
    //console.log(`${market.name} is influenced by the following regions:`);
    switch (market.name) {
      case 'ASX200':
        //console.log(' Australia');
        addMarketids('Australia', market._id, regionArr);
        break;

      case 'AUDUSD':
        //console.log(' Australia');
        addMarketids('Australia', market._id, regionArr);
        break;

      case 'AUDJPY':
        //console.log(' Australia');
        addMarketids('Australia', market._id, regionArr);
        break;

      case 'GBPUSD':
        //console.log(' UK');
        addMarketids('UK', market._id, regionArr);
        break;
    } // All markets are influenced by Region = USA, Europe
    //console.log(' Europe');


    addMarketids('Europe', market._id, regionArr); //console.log(' USA');

    addMarketids('USA', market._id, regionArr);
  });
}).then(function (done) {
  // Regions: The market_ids are stored in the array and it is now ready to save to db
  regionArr.forEach(function (e) {
    Region.findOne({
      name: e.name
    }).then(function (region) {
      if (region) {
        console.log('Region already exists');
      } else {
        var newRegion = new Region({
          name: e.name,
          market_ids: e.market_ids,
          keywords: e.keywords
        });
        console.log("".concat(e.name, " saved"));
        newRegion.save();
      }
    });
  });
  return regionArr;
})["catch"](function (err) {
  return console.log(err);
});
//# sourceMappingURL=init.js.map