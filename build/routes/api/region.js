"use strict";

var _Region = _interopRequireDefault(require("../../models/Region"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require("express");

var router = express.Router(); // Item Model

// @route   GET api/region
// @desc    Get All Items
// @access  Public
router.get("/", function (req, res) {
  _Region["default"].find().then(function (region) {
    return res.json(region);
  });
});
module.exports = router;
//# sourceMappingURL=region.js.map