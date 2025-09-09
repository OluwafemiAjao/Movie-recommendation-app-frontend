// import { useState, useEffect } from "react";

// const useFavorites = () => {
//   const [favorites, setFavorites] = useState(() => {
//     const saved = localStorage.getItem("favorites");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const toggleFavorite = (movie) => {
//     const exists = favorites.find((fav) => fav.id === movie.id);
//     const updated = exists
//       ? favorites.filter((fav) => fav.id !== movie.id)
//       : [...favorites, movie];

//     setFavorites(updated);
//     localStorage.setItem("favorites", JSON.stringify(updated));
//   };

//   return { favorites, toggleFavorite };
// };

// export default useFavorites;




// import { useState, useEffect } from "react";
// import {
//   getFavorites,
//   addFavorite,
//   removeFavorite,
// } from "../services/favoriteService";

// const useFavorites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load favorites from backend on mount
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const data = await getFavorites();
//         console.log("Fetched favorites:", data);
//         setFavorites(data);
//       } catch (err) {
//         console.error("Failed to fetch favorites:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFavorites();
//   }, []);

//   // Check if movie is in favorites
//   const isFavorite = (id) => favorites.some((fav) => fav.id === id);

//   // Toggle favorite
//   const toggleFavorite = async (movie) => {
//     try {
//       if (isFavorite(movie.id)) {
//         await removeFavorite(movie.id);
//         setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
//       } else {
//         const newFav = await addFavorite(movie);
//         setFavorites((prev) => [...prev, newFav]);
//       }
//     } catch (err) {
//       console.error("Failed to toggle favorite:", err);
//     }
//   };

//   return { favorites, isFavorite, toggleFavorite, loading };
// };

// export default useFavorites;




// hooks/useFavorites.js
import { useEffect, useMemo, useState } from "react";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";

const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const ids = await getFavorites();
        if (alive) setFavoriteIds(ids);
      } catch (err) {
        console.error("Failed to fetch favorites:", err?.response?.data || err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const idSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = (id) => idSet.has(id);

  const toggleFavorite = async (movieOrId) => {
    const id = typeof movieOrId === "object" ? movieOrId.id : movieOrId;
    try {
      const updated = idSet.has(id) ? await removeFavorite(id) : await addFavorite(id);
      setFavoriteIds(updated);
    } catch (err) {
      console.error("Failed to toggle favorite:", err?.response?.data || err.message);
    }
  };

  // expose ids; pages that need full cards can resolve IDs via TMDB
  return { favorites: favoriteIds, isFavorite, toggleFavorite, loading };
};

export default useFavorites;
