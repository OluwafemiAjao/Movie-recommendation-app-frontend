// // services/watchlistService.js
// import backendApi from "./axiosConfig";

// export const getWatchlist = async () => {
//   const res = await backendApi.get("/watchlist");
//   return res.data;
// };

// export const addToWatchlist = async (movie) => {
//   const res = await backendApi.post("/watchlist", movie);
//   return res.data;
// };

// export const removeFromWatchlist = async (movieId) => {
//   const res = await backendApi.delete(`/watchlist/${movieId}`);
//   return res.data;
// };




// services/watchlistService.js
import backendApi from "./axiosConfig";

// normalize into number[]
const normalizeWatchlistIds = (payload) => {
  const raw = payload?.watchlist ?? payload ?? [];
  return (Array.isArray(raw) ? raw : []).map((x) => {
    if (typeof x === "number") return x;
    if (typeof x === "string") return parseInt(x, 10);
    if (x && typeof x === "object") {
      return x.movieId ?? x.id ?? null;
    }
    return null;
  }).filter((v) => Number.isFinite(v));
};

export const getWatchlist = async () => {
  const res = await backendApi.get("/watchlist");
  return normalizeWatchlistIds(res.data);
};

export const addToWatchlist = async (movieOrId) => {
  const movieId = typeof movieOrId === "object" ? movieOrId.id : movieOrId;
  const res = await backendApi.post("/watchlist", { movieId });
  return normalizeWatchlistIds(res.data);
};

export const removeFromWatchlist = async (movieId) => {
  const res = await backendApi.delete(`/watchlist/${movieId}`);
  return normalizeWatchlistIds(res.data);
};
