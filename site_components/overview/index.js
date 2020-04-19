var Event = require('../../models/Event');

module.exports = {
    getAllEvents: async function() {
        let getAllEvents = await Event.find({},{},{sort:{date: -1}});

        return getAllEvents;
    }

}