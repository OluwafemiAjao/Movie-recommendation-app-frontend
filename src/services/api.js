import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
  timeout: 10000, // 10s timeout to avoid hanging requests
});

// Optional: Global response interceptor for logging or transformation || GLOBAL ERROR HANDLER INTERCEPTOR || Global error handler (non-blocking)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
