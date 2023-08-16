// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBeznBdHkTL7BfydgtR71xeaL2Tw4p-WY",
  authDomain: "react-social-media-c32be.firebaseapp.com",
  projectId: "react-social-media-c32be",
  storageBucket: "react-social-media-c32be.appspot.com",
  messagingSenderId: "46255372119",
  appId: "1:46255372119:web:e4e4e6351f3255e4333012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);