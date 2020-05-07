"use strict";

var express = require('express');

var router = express.Router(); // Market Model

var Theme = require('../../models/Theme'); // @route   GET api/theme
// @desc    Get All Themes
// @access  Public


router.get('/', function (req, res) {
  Theme.find().then(function (themes) {
    if (themes.length == 0) return res.status(400).json({
      msg: 'No themes found.'
    });
    res.json(themes);
  });
}); // @route   POST api/theme
// @desc    Add New Theme
// @access  Public

router.post('/', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      description = _req$body.description,
      start_date = _req$body.start_date,
      timeframe = _req$body.timeframe,
      user = _req$body.user,
      markets = _req$body.markets;

  if (!name && !description && !timeframe && !markets) {
    return res.status(400).json({
      msg: 'Please enter all fields'
    });
  }

  Theme.findOne({
    name: name
  }).then(function (theme) {
    if (theme) return res.status(400).json({
      msg: 'Theme already exists'
    });
  })["catch"](function (err) {
    return res.status(400).json({
      msg: 'Error searching for theme'
    });
  });
  var newTheme = new Theme({
    name: name,
    description: description,
    timeframe: timeframe,
    start_date: start_date,
    author: user,
    markets: markets
  });
  newTheme.save().then(function (user) {
    res.json({
      _id: _id,
      name: name
    });
  })["catch"](function (err) {
    return res.status(400).json({
      msg: err
    });
  });
});
module.exports = router;
//# sourceMappingURL=theme.js.map