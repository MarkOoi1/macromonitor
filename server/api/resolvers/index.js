const Region = require("../../models/Region");
const Event = require("../../models/Event");
const usersResolvers = require("./users");

const resolvers = {
  Query: {
    regions: () => Region.find(),
    events: () => Event.find({}, {}, { sort: { date: -1 } }),
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};

module.exports = resolvers;
