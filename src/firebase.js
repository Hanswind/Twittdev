import * as firebase from "firebase/app";
import dotenv from "dotenv";

const firebaseConfig = {
  apiKey: "AIzaSyBvR66ymTQNRBxpQVFzo3_BmNCQ5KS7VGo",
  authDomain: "twittdev-2233e.firebaseapp.com",
  databaseURL: "https://twittdev-2233e.firebaseio.com",
  projectId: "twittdev-2233e",
  storageBucket: "twittdev-2233e.appspot.com",
  messagingSenderId: "159793024581",
  appId: "1:159793024581:web:337a26cc0e8c1f50b7dd2c",
};

export default firebase.initializeApp(firebaseConfig);
