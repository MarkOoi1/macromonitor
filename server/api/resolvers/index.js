const Region = require("../../models/Region");
const Event = require("../../models/Event");

const resolvers = {
  Query: {
    regions: () => Region.find(),
    events: () => Event.find({}, {}, { sort: { date: -1 } }),
  },
};

module.exports = resolvers;
