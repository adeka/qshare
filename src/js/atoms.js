import { atom } from "recoil";

export const textState = atom({
  key: "count",
  default: 0
});

export const searchResultsState = atom({
  key: "searchResults",
  default: []
});
