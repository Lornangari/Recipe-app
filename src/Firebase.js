import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCLkgIfMrYJSttYTwCPIZhyUXqjnxlPhak",
  authDomain: "recipe-app-c9f6c.firebaseapp.com",
  projectId: "recipe-app-c9f6c",
  storageBucket: "recipe-app-c9f6c.firebasestorage.app",
  messagingSenderId: "893109666328",
  appId: "1:893109666328:web:34e5199a73bc2670b5396d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // for wishlist
