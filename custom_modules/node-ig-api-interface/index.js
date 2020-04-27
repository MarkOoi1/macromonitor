const util = require('util');

const ig = require('./node-ig-api');

// Price Model. Output array of EPICs mutated for the IG API
const Market = require('../../models/Market');
const markets = Market.find({}).exec();

let items =markets.then(arr => {
  items = arr.map( ({ epic }) => epic);
  items.forEach((val,index) => {
    items[index] = `CHART:${val}:1MINUTE`;
  })
  return items
});



module.exports = ig.initiateToken()
    .then(res => {
        ig.login(true).then(r => console.log(util.inspect(r.accountType, false, null))).catch(e => console.log(e));
        ig.acctInfo().then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));
    })
    .then(() => {
        // Subscribe to real-time data
        let subscriptionMode = 'MERGE'; 
        //let items = ['CHART:IX.D.ASX.IFT.IP:1MINUTE','CHART:CS.D.AUDUSD.MINI.IP:1MINUTE'];
        let fields = ['LTV', 'TTV', 'UTM', 'DAY_OPEN_MID', 'DAY_NET_CHG_MID', 'DAY_PERC_CHG_MID', 'DAY_HIGH', 'DAY_LOW', 'OFR_OPEN', 'OFR_HIGH', 'OFR_LOW', 'OFR_CLOSE', 'BID_OPEN', 'BID_HIGH', 'BID_LOW', 'BID_CLOSE', 'LTP_OPEN', 'LTP_HIGH', 'LTP_LOW', 'LTP_CLOSE', 'CONS_END', 'CONS_TICK_COUNT'];
        
        ig.connectToLightstreamer();
        ig.subscribeToLightstreamer(subscriptionMode, items, fields, 0.5);

    });