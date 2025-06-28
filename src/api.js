// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com/api", // Replace with your actual backend base URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
