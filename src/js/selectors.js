import { selector } from "recoil";
import {
  roomState,
  playlistState,
  roomResultsState,
  userState
} from "JS/atoms";
import { firestore } from "Client/firestore";

export const userSelector = selector({
  key: "currentUser",
  get: ({ get }) => {
    const user = get(userState);
    return user;
  }
});

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
  get: async () => {
    // const rooms = await firestore.collection("rooms").get();

    // const roomResults = [];
    // rooms.forEach(doc => {
    //   roomResults.push({
    //     ...doc.data(),
    //     roomId: doc.id
    //   });
    // });
    // console.log(roomResults);

    // return roomResults;

    return [];
  }
  // get: ({ get }) => {
  //   const rooms = get(roomResultsState);
  //   return rooms;
  // }
  // set: ({ set }, rooms) => set(roomResultsState, rooms)
});
