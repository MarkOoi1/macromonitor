"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../../middleware/auth'); // Event Model


var Event = require('../../models/Event'); // @route   GET api/events
// @desc    Get All Items
// @access  Private


router.get('/', function (req, res) {
  Event.find({}, {}, {
    sort: {
      date: -1
    }
  }).then(function (events) {
    return res.json(events);
  });
}); // @route   GET api/events
// @desc    Get Items by 
// @access  Public

router.get('/:id', function (req, res) {
  Event.findById(req.params.id).then(function (events) {
    return res.json(events);
  })["catch"](function (err) {
    return res.status(400).json('Error: ' + err);
  });
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
//# sourceMappingURL=events.js.map