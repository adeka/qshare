import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: null
});

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

export const lobbyState = atom({
  key: "lobby",
  default: []
});

export const roomResultsState = atom({
  key: "roomResults",
  default: []
});

export const playlistState = atom({
  key: "playlist",
  default: []
});

export const activeVideoState = atom({
  key: "activeVideo",
  default: {}
});

export const chatState = atom({
  key: "chat",
  default: []
});
