import { selector } from "recoil";
import { roomState, playlistState, roomResultsState } from "JS/atoms";
import firestore from "Client/firestore";

export const currentRoomName = selector({
  key: "currentRoomName",
  get: ({ get }) => {
    const room = get(roomState);
    return room?.name;
  }
});

export const playlistLengthSelector = selector({
  key: "playlistLength",
  get: ({ get }) => {
    const playlist = get(playlistState);
    return playlist.length;
  }
});

export const playlistSelector = selector({
  key: "currentVideos",
  get: ({ get }) => {
    const playlist = get(playlistState);
    return playlist;
  }
});

export const roomResultsSelector = selector({
  key: "currentRooms",
  get: ({ get }) => {
    const rooms = get(roomResultsState);
    return rooms;
  }
});
