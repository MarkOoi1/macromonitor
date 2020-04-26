const express = require('express');
const router = express.Router();

// Event Model
const Event = require('../../models/Event');

// @route   GET api/events
// @desc    Get All Items
// @access  Public
router.get('/', (req,res) => {
    Event.find()
        .then(events => res.json(events))
});

module.exports = router;