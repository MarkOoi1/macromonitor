const Region = require("../models/Region");

const resolvers = {
  Query: {
    regions: () => Region.find(),
  },
};

module.exports = resolvers;
