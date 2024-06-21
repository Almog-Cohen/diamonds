const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    diamonds(
      price: Int
      shape: String
      color: String
      clarity: String
      carat: Float
      cut: String
      isLabDiamond: Boolean
      offset: Int
      limit: Int
    ): [Diamond]
  }

  type Diamond {
    id: ID
    price: Int
    shape: String
    color: String
    clarity: String
    carat: Float
    cut: String
    isLabDiamond: Boolean
  }
`;

module.exports = typeDefs;
