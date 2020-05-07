const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Event Model
const Event = require('../../models/Event');

// @route   GET api/events
// @desc    Get All Items
// @access  Private
router.get('/', (req,res) => {
    Event.find({},{},{sort:{date: -1}})
        .then(events => res.json(events))
});

// @route   GET api/events
// @desc    Get Items by 
// @access  Public
router.get('/:id', (req,res) => {
    Event.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
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