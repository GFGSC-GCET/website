import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyBNahzl_RTWHB_O4D1srT1a2366fHmsdgg",
  authDomain: "gfgsc-gcet.firebaseapp.com",
  databaseURL: "https://gfgsc-gcet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gfgsc-gcet",
  storageBucket: "gfgsc-gcet.appspot.com",
  messagingSenderId: "564569297401",
  appId: "1:564569297401:web:9c6e32695856f8d14fed28",
  measurementId: "G-PYTT0S74V0"
};

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore();
export const database = getDatabase();
export const storage = getStorage(app);
