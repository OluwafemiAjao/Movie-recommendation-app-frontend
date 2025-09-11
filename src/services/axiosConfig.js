// services/axiosConfig.js
import axios from "axios";

const backendApi = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api", // later replace with Render/Heroku URL
  // baseURL: "https://movie-recommendation-app-backend-4ghi.onrender.com/api",
  baseURL: "https://movie-recommendation-app-backend-4ghi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Attach token for protected routes
backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response interceptor
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Backend API Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default backendApi;


