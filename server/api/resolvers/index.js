const Region = require("../../models/Region");
const Event = require("../../models/Event");
const usersResolvers = require("./users");
const authResolvers = require("./auth");
const themesResolvers = require("./themes");

const resolvers = {
  Query: {
    regions: () => Region.find(),
    events: () => Event.find({}, {}, { sort: { date: -1 } }),
    ...usersResolvers.Query,
    ...themesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...authResolvers.Mutation,
    ...themesResolvers.Mutation,
  },
};

module.exports = resolvers;
