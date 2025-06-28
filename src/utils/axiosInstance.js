// src/utils/axiosInstance.js
import axios from "axios";
import { auth } from "../firebase";
import { onIdTokenChanged } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: "/", // Set this to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically refresh token and attach
onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    localStorage.setItem("authToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("authToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
});

export default axiosInstance;
