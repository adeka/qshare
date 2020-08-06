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
const firestore = firebase.firestore(app);

export default firestore;
