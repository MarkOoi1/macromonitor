const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    regions: [Region!]!
  }

  type Region {
    market_ids: [ID]
    keywords: [String]
    name: String!
  }
`;

module.exports = typeDefs;
