const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    regions: [Region!]!
    events: [Event!]
  }

  type Region {
    market_ids: [ID]
    keywords: [String]
    name: String!
  }

  type Event {
    type: String
    profile: String
    content: String!
    keywords: [String]
    date: Date
  }

  scalar Date
`;

module.exports = typeDefs;
