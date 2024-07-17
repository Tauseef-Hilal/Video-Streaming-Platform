import { GraphQLScalarType, Kind } from "graphql";

const DateTimeResolver = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "string") {
      return new Date(value);
    }
    throw new Error("GraphQL Date Scalar parser expected a `string`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    return null;
  },
});

export default DateTimeResolver;
