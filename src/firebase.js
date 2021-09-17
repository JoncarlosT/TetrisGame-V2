import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCOknQcrwPStYtsQkWb3wnVqW_EEXnkh28",
  authDomain: "tetrisgame-v2.firebaseapp.com",
  projectId: "tetrisgame-v2",
  storageBucket: "tetrisgame-v2.appspot.com",
  messagingSenderId: "756226440387",
  appId: "1:756226440387:web:307b64b48239eb5bc77676",
  measurementId: "G-8DRXQHE5FH",
});

const db = getFirestore(firebaseApp);

export default db;
