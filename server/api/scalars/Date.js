const { Kind } = require("graphql/language");
const { GraphQLScalarType } = require("graphql");

function serialize(value) {
  return value instanceof Date ? value.toString() : null;
}

function parseValue(value) {
  return returnOnError(() => (value == null ? null : new Date(value)), null);
}

function parseLiteral(ast) {
  return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

const resolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize,
    parseValue,
    parseLiteral,
  }),
};

module.exports = resolverMap;
