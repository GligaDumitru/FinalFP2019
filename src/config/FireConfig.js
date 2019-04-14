import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyCXr_GR3nfQF4ryal8xzD1T0LZYMM0vFdI",
  authDomain: "betterthanyoucanthink-c9a32.firebaseapp.com",
  databaseURL: "https://betterthanyoucanthink-c9a32.firebaseio.com",
  projectId: "betterthanyoucanthink-c9a32",
  storageBucket: "betterthanyoucanthink-c9a32.appspot.com",
  messagingSenderId: "466490348132"
};

const firebaseProvider = firebase.initializeApp(config);
export default firebaseProvider;
