const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

/***
 * Load Components: Monetary Policy, Economic data, COVID19, Markets
 * /site_components/monetarypolicy/index.js
 * /site_components/economy/index.js
 * /site_components/covid19/index.js
 * /site_components/markets/index.js
 * 
 * Assign data to the template
 * 
 */
const overview = require('../site_components/overview');
let getAllEvents;
let monetarypolicy = require('../site_components/monetarypolicy');
getAllEvents = overview.getAllEvents()
    .then(res => {
        getAllEvents = res;
        return getAllEvents;
    })
    .catch(err => console.log(err));


/* Monetary Policy vars:
 * 1. Data split by region
 * 2. US: A table of Fed comments with a date
 * 3. AU: Latest RBA comments
 * 4. EU: Latest ECB comments
 * 5. UK: Latest BoE comments 

*/

/****
 * Enable components on separate URLs
 * forEach looping through components
router.get('/monetarypolicy', ensureAuthenticated, (req, res) => res.render('dashboard', {
    req: req,
    mp: monetarypolicy
}));

*/

// Welcome page
router.get('/', (req, res) => {
        switch(req.query.region) {
            case 'Australia': 
                req.session.region = 'Australia';
                break;
            case 'Europe': 
                req.session.region = 'Europe';
                break;
            case 'United States': 
                req.session.region = 'United States';
                break;
            case 'United Kingdom': 
                req.session.region = 'United Kingdom';
                break;
            default:
                req.session.region = 'Worldwide';
                break;
        }
        
        res.render('dashboard', {
            req: req,
            overview: getAllEvents,
            mp: monetarypolicy
        });
});

module.exports = router;