import { atom } from "recoil";

export const searchResultsState = atom({
  key: "searchResults",
  default: []
});

export const videoPlayerState = atom({
  key: "videoPlayer",
  default: null
});
