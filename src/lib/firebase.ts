// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWQ7clsiqr47Pz13iawwR-0vBYnJrJtk8",
  authDomain: "hydrocult-10568.firebaseapp.com",
  projectId: "hydrocult-10568",
  storageBucket: "hydrocult-10568.appspot.com",
  messagingSenderId: "427208428020",
  appId: "1:427208428020:web:7e2152a2a14f62737251a1",
  measurementId: "G-57N5YE7CLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
