// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyChM1wKnnq-tTWCuKX2plRrpy43B3KWQeU",
  authDomain: "job-portal-3f519.firebaseapp.com",
  projectId: "job-portal-3f519",
  storageBucket: "job-portal-3f519.appspot.com",
  messagingSenderId: "910287883365",
  appId: "1:910287883365:web:0cf8230b549b5098b0ca8c",
  measurementId: "G-ZPELR12374"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Auto-refresh and store ID token in localStorage
onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    const result = await user.getIdTokenResult();
    const expiresIn = new Date(result.expirationTime).getTime(); // in ms

    localStorage.setItem("authToken", token);
    localStorage.setItem("tokenExpiry", expiresIn.toString());
  } else {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
  }
});



