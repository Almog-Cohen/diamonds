// src/state.js
import { atom, selector } from "recoil";
import fetchDiamondsService from "./services/fetchDiamondsService";

export const filtersState = atom({
  key: "filtersState",
  default: {
    price: "",
    shape: "",
    color: "",
    clarity: "",
    carat: "",
    cut: "",
    isLabDiamond: "",
  },
});

export const diamondsQuery = selector({
  key: "diamondsQuery",
  get: async ({ get }) => {
    const filters = get(filtersState);
    const response = await fetchDiamondsService(filters); //graphql query
    return response;
  },
});
