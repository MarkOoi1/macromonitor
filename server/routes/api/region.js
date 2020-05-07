const express = require("express");
const router = express.Router();

// Item Model
import Region from "../../models/Region";

// @route   GET api/region
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Region.find().then((region) => res.json(region));
});

module.exports = router;
