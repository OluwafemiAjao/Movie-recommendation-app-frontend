// import { useEffect, useState } from "react";

// const STORAGE_KEY = "watchlist";

// const useWatchlist = () => {
//   const [watchlist, setWatchlist] = useState(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
//     } catch {}
//   }, [watchlist]);

//   const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

//   const toggleWatchlist = (item) => {
//     setWatchlist((prev) => {
//       const exists = prev.some((p) => p.id === item.id);
//       if (exists) return prev.filter((p) => p.id !== item.id);
//       return [...prev, item];
//     });
//   };

//   return { watchlist, isInWatchlist, toggleWatchlist };
// };

// export default useWatchlist;





// import { useState, useEffect } from "react";
// import {
//   getWatchlist,
//   addToWatchlist,
//   removeFromWatchlist,
// } from "../services/watchlistService";

// const useWatchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load watchlist from backend on mount
//   useEffect(() => {
//     const fetchWatchlist = async () => {
//       try {
//         const data = await getWatchlist();
//         console.log("Fetched watchlist:", data);
//         setWatchlist(data);
//       } catch (err) {
//         console.error("Failed to fetch watchlist:", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWatchlist();
//   }, []);

//   // Check if movie is in watchlist
//   const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

//   // Toggle watchlist
//   const toggleWatchlist = async (movie) => {
//     try {
//       if (isInWatchlist(movie.id)) {
//         await removeFromWatchlist(movie.id);
//         setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
//       } else {
//         const newItem = await addToWatchlist(movie);
//         setWatchlist((prev) => [...prev, newItem]);
//       }
//     } catch (err) {
//       console.error("Failed to toggle watchlist:", err);
//     }
//   };

//   return { watchlist, isInWatchlist, toggleWatchlist, loading };
// };

// export default useWatchlist;





// hooks/useWatchlist.js
import { useEffect, useMemo, useState } from "react";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../services/watchlistService";

const useWatchlist = () => {
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const ids = await getWatchlist();
        if (alive) setWatchlistIds(ids);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err?.response?.data || err.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const idSet = useMemo(() => new Set(watchlistIds), [watchlistIds]);

  const isInWatchlist = (id) => idSet.has(id);

  const toggleWatchlist = async (movieOrId) => {
    const id = typeof movieOrId === "object" ? movieOrId.id : movieOrId;
    try {
      const updated = idSet.has(id) ? await removeFromWatchlist(id) : await addToWatchlist(id);
      setWatchlistIds(updated);
    } catch (err) {
      console.error("Failed to toggle watchlist:", err?.response?.data || err.message);
    }
  };

  return { watchlist: watchlistIds, isInWatchlist, toggleWatchlist, loading };
};

export default useWatchlist;
