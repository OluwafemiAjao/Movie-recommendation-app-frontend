// // services/favoriteService.js
// import backendApi from "./axiosConfig";

// export const getFavorites = async () => {
//   const res = await backendApi.get("/favorites");
//   return res.data;
// };

// export const addFavorite = async (movie) => {
//   const res = await backendApi.post("/favorites", movie);
//   return res.data;
// };

// export const removeFavorite = async (movieId) => {
//   const res = await backendApi.delete(`/favorites/${movieId}`);
//   return res.data;
// };



// services/favoriteService.js
import backendApi from "./axiosConfig";

// normalize whatever backend sends into a clean array of numeric IDs
const normalizeFavoriteIds = (payload) => {
  const raw = payload?.favorites ?? payload ?? [];
  return (Array.isArray(raw) ? raw : []).map((x) => {
    if (typeof x === "number") return x;
    if (typeof x === "string") return parseInt(x, 10);
    if (x && typeof x === "object") {
      // support both { movieId } and { id }
      return x.movieId ?? x.id ?? null;
    }
    return null;
  }).filter((v) => Number.isFinite(v));
};

export const getFavorites = async () => {
  const res = await backendApi.get("/favorites");
  return normalizeFavoriteIds(res.data);
};

export const addFavorite = async (movieOrId) => {
  const movieId = typeof movieOrId === "object" ? movieOrId.id : movieOrId;
  const res = await backendApi.post("/favorites", { movieId });
  return normalizeFavoriteIds(res.data);
};

export const removeFavorite = async (movieId) => {
  const res = await backendApi.delete(`/favorites/${movieId}`);
  return normalizeFavoriteIds(res.data);
};
