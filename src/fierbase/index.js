import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDYwHV3hqOIWWmWULRjt_C1ylAD_TMLkGw",
  authDomain: "itm-project-e9cd6.firebaseapp.com",
  databaseURL: "https://itm-project-e9cd6.firebaseio.com",
  projectId: "itm-project-e9cd6",
  storageBucket: "itm-project-e9cd6.appspot.com",
  messagingSenderId: "1061194870029",
  appId: "1:1061194870029:web:145452f1a19207ef111444",
  measurementId: "G-PFGB6JS2ZP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firebaseAuth = firebase.auth();

export const signInWithGoogle = async () => {
  try {
    const authResult = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider);
    return authResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default db;
