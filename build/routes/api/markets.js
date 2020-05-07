"use strict";

var express = require('express');

var router = express.Router(); // Market Model

var Market = require('../../models/Market'); // @route   GET api/markets
// @desc    Get All Markets
// @access  Public


router.get('/', function (req, res) {
  Market.find().then(function (markets) {
    return res.json(markets);
  });
});
module.exports = router;
//# sourceMappingURL=markets.js.map