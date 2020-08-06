import { atom } from "recoil";

export const searchResultsState = atom({
  key: "searchResults",
  default: []
});

export const videoPlayerState = atom({
  key: "videoPlayer",
  default: null
});

export const roomState = atom({
  key: "room",
  default: null
});

export const playlistState = atom({
  key: "playlist",
  default: []
});
