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
let overview = require('../site_components/overview');
let monetarypolicy = require('../site_components/monetarypolicy');

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
router.get('/', ensureAuthenticated, (req, res) => {
        req.session.region = req.query.region || 'Worldwide';

        res.render('dashboard', {
            req: req,
            overview,
            mp: monetarypolicy
        });
});

module.exports = router;