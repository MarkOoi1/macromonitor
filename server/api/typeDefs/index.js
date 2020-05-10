const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Token {
    token: String!
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

  type User {
    name: String!
    email: String!
    complete: Boolean!
    welcomemsg: Boolean!
    date: Date
  }

  type RegUser {
    token: String!
    user: User!
  }

  input registerInput {
    name: String!
    email: String!
    password: String
    google: String
  }

  scalar Date

  type Query {
    regions: [Region!]!
    events: [Event!]
    user(email: String!): User
  }

  type Mutation {
    register(registerInput: registerInput): RegUser
  }
`;

module.exports = typeDefs;
