const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome page
router.get('/', (req, res) => res.render('welcome', {
    req: req
}));

module.exports = router;