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

/*
module.exports = {
    getAllEvents: async function() {
        let getAllEvents = await Event.find({},{},{sort:{date: -1}});

        return getAllEvents;
    },
    getEventsByType: async function(reqType) {
        let getEventsByType = await Event.find({type:reqType},{},{sort:{date: -1}});

        return getEventsByType;
    }
}
*/