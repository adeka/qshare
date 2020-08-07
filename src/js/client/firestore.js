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

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
