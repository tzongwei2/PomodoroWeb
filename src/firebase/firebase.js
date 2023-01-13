// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf2OfewqlZJWwkDUXNYqs7I0JNRvEuyeM",
  authDomain: "pomodoro-a13f5.firebaseapp.com",
  projectId: "pomodoro-a13f5",
  storageBucket: "pomodoro-a13f5.appspot.com",
  messagingSenderId: "473864785179",
  appId: "1:473864785179:web:54e79d29160f61114797be",
  measurementId: "G-HB8YN62BJJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)