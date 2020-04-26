const express = require('express');
const router = express.Router();

// Market Model
const Market = require('../../models/Market');

// @route   GET api/markets
// @desc    Get All Markets
// @access  Public
router.get('/', (req,res) => {
    Market.find()
        .then(markets => res.json(markets))
});

module.exports = router;