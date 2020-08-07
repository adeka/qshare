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

// export const currentVideos = selector({
//   key: "currentVideos",
//   get: async ({ get }) => {
//     // let snapshot = await firebase.firestore()
//     // .collection('route')
//     // .doc('0bayKbCiAchc0Vy9XuxT')
//     // .collection('qa')
//     // .get()

//     const videos = await firestore
//       .collection("rooms")
//       .doc("wRDLEoQHH8VkmZFYBcBi")
//       .collection("videos");

//     console.log(videos);

//     return videos;

//     // onSnapshot(snapshot => {
//     //   const firstRoom = snapshot.docs[0];
//     //   const firstRoomData = firstRoom.data();

//     //   updateRoom(firstRoom);
//     //   console.log(firstRoom);
//     // });

//     // snapshot.forEach(doc =>{
//     //   console.log('hello', doc.data())
//     // })

//     // const response = await myDBQuery({
//     //   userID: get(currentUserIDState),
//     // });
//     // return response.name;
//   }
// });
