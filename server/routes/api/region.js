const express = require("express");
const router = express.Router();

// Item Model
const Region = require("../../models/Region");

// @route   GET api/region
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Region.find().then((region) => res.json(region));
});

module.exports = router;
