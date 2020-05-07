import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    regions: [Region!]!
  }

  type Region {
    market_ids: [ID]
    keywords: [String]
    name: String!
  }
`;
