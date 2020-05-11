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

  type TradeableMarket {
    code: String!
    type: String!
    direction: String!
    allocation: Int
    currentPrice: Float
    lowPrice: Float
    targetPrice: Float
    roi: Float
    triangulation1: String
    triangulation2: String
    triangulation3: String
  }

  type Theme {
    name: String!
    description: String!
    author: User!
    start_date: Date!
    end_date: Date!
    markets: [TradeableMarket]
    status: String!
  }

  type RegUser {
    token: String!
    user: User!
  }

  type themePayload {
    theme_id: ID
    status: String!
  }

  input registerInput {
    name: String!
    email: String!
    password: String
    google: String
  }

  input loginInput {
    email: String!
    password: String
    google: String
  }

  input themeInput {
    name: String!
    description: String!
    start_date: Date!
    end_date: Date!
    author: ID!
  }

  scalar Date

  type Query {
    regions: [Region!]!
    events: [Event!]
    user(email: String!): User
    themes: [Theme!]!
  }

  type Mutation {
    register(registerInput: registerInput): RegUser
    login(loginInput: loginInput): RegUser
    addTheme(themeInput: themeInput): themePayload
  }
`;

module.exports = typeDefs;
