// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY0taFj5a8SUWwwrw-O6nDF6YigbfYl1c",
  authDomain: "dsw-turnosmedicos.firebaseapp.com",
  projectId: "dsw-turnosmedicos",
  storageBucket: "dsw-turnosmedicos.appspot.com",
  messagingSenderId: "803596798543",
  appId: "1:803596798543:web:b2d4c30e5c960cdd7ff83a",
  measurementId: "G-XJ147F71BG",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
