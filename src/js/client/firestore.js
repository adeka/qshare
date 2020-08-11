import firebase from "firebase";

const config = {
  apiKey: process.env.firebase_api_key,
  authDomain: `${process.env.firebase_project_id}.firebaseapp.com`,
  databaseURL: `https://${process.env.firebase_project_id}.firebaseio.com`,
  projectId: process.env.firebase_project_id,
  storageBucket: `${process.env.firebase_project_id}.appspot.com`,
  messagingSenderId: process.env.messaging_sender_id
};

const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

export const createUser = async user => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

export const tryAddUserToRoom = async (roomId, userId) => {
  if (!roomId || !userId) return null;

  const userRef = firestore.doc(`rooms/${roomId}/users/${userId}`);
  const snapshot = userRef.get();
  if (!snapshot.exists) {
    try {
      var date = new Date();
      var timestamp = date.getTime();

      await userRef.set({
        timestamp
      });
    } catch (error) {
      console.error("Error adding user to room", error);
    }
  }
};

export const getUser = async userId => {
  if (!userId) return null;

  try {
    const userDocument = await firestore.doc(`users/${userId}`).get();
    const userData = userDocument.data();
    return {
      name: userData.displayName,
      photoUrl: userData.photoURL,
      userId: userId
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const incrementCurrentVideoIndex = async (
  room,
  playlist,
  currentVideo
) => {
  if (!room || !playlist || !currentVideo) return null;

  try {
    const nextVideoIndex = playlist[playlist.indexOf(currentVideo) + 1].index;

    firestore
      .doc(`rooms/${room.roomId}`)
      .update({ currentVideoIndex: nextVideoIndex });
  } catch (error) {
    console.error("Error incrementing current video index", error);
  }
};
