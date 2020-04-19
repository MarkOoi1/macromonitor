var Event = require('../../models/Event');

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