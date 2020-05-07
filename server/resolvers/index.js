import Region from "../models/Region";

export const resolvers = {
  Query: {
    regions: () => Region.find(),
  },
};
