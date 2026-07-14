
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb7ZsCDJELpOiTtjCPWPxHMxpRkL44EHU",
  authDomain: "pharma-export-ac706.firebaseapp.com",
  projectId: "pharma-export-ac706",
  storageBucket: "pharma-export-ac706.firebasestorage.app",
  messagingSenderId: "167302904762",
  appId: "1:167302904762:web:659f38d7a44dd670c27b83",
  measurementId: "G-C2G0FFNF8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);