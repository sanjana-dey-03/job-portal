// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChM1wKnnq-tTWCuKX2plRrpy43B3KWQeU",
  authDomain: "job-portal-3f519.firebaseapp.com",
  projectId: "job-portal-3f519",
  storageBucket: "job-portal-3f519.appspot.com",
  messagingSenderId: "910287883365",
  appId: "1:910287883365:web:0cf8230b549b5098b0ca8c",
  measurementId: "G-ZPELR12374"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


