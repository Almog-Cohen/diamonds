// src/fetchDiamonds.js
import { gql } from "@apollo/client";
import client from "../apolloClient";

const GET_DIAMONDS = gql`
  query GetDiamonds(
    $price: Int
    $shape: String
    $color: String
    $clarity: String
    $carat: Float
    $cut: String
    $isLabDiamond: Boolean
  ) {
    diamonds(
      price: $price
      shape: $shape
      color: $color
      clarity: $clarity
      carat: $carat
      cut: $cut
      isLabDiamond: $isLabDiamond
    ) {
      id
      price
      shape
      color
      clarity
      carat
      cut
      isLabDiamond
    }
  }
`;

const fetchDiamondsService = async (filters) => {
  const { data } = await client.query({
    query: GET_DIAMONDS,
    variables: {
      price: filters.price ? parseInt(filters.price) : undefined,
      shape: filters.shape || undefined,
      color: filters.color || undefined,
      clarity: filters.clarity || undefined,
      carat: filters.carat ? parseFloat(filters.carat) : undefined,
      cut: filters.cut || undefined,
      isLabDiamond: filters.isLabDiamond ? filters.isLabDiamond === "true" : undefined,
    },
  });
  return data.diamonds;
};

export default fetchDiamondsService;
