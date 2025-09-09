// import React, { useEffect, useState } from "react";

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     // Load watchlist from localStorage
//     const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
//     setWatchlist(storedWatchlist);
//   }, []);

//   const removeFromWatchlist = (id) => {
//     const updatedList = watchlist.filter(movie => movie.id !== id);
//     setWatchlist(updatedList);
//     localStorage.setItem("watchlist", JSON.stringify(updatedList));
//   };

//   return (
//     <div className="watchlist">
//       <h2>Your Watchlist</h2>
//       {watchlist.length === 0 ? (
//         <p>No movies in your watchlist.</p>
//       ) : (
//         <ul>
//           {watchlist.map(movie => (
//             <li key={movie.id}>
//               {movie.title}
//               <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Watchlist;





// import React, { useEffect, useState } from "react";
// import MovieList from "../components/MovieList";

// const Watchlist = ({ hideTitle = false }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
//     setWatchlist(storedWatchlist);
//   }, []);

//   const removeFromWatchlist = (id) => {
//     const updatedList = watchlist.filter((movie) => movie.id !== id);
//     setWatchlist(updatedList);
//     localStorage.setItem("watchlist", JSON.stringify(updatedList));
//   };

//   return (
//     <div className="p-6">
//       {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//       <MovieList title="Saved Movies & TV Shows" movies={watchlist} />
//     </div>
//   );
// };

// export default Watchlist;




// import React from "react";
// import MovieList from "./MovieList";
// import useWatchlist from "../hooks/useWatchlist";

// const Watchlist = ({ hideTitle = false }) => {
//   const { watchlist } = useWatchlist();

//   if (!watchlist.length) {
//     return (
//       <div className="p-6">
//         {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//         <p className="text-gray-400">Your watchlist is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//       {/* MovieList uses MovieCard under the hood, which we’ll update to render name/title */}
//       <MovieList title="Saved Movies & TV Shows" movies={watchlist} />
//     </div>
//   );
// };

// export default Watchlist;



// import { useEffect, useState } from "react";
// import { getWatchlist } from "../services/watchlistService";
// import MovieList from "./MovieList";

// const Watchlist = ({ hideTitle = false }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   useEffect(() => {
//     getWatchlist()
//       .then(setWatchlist)
//       .catch(() => setWatchlist([]));
//   }, []);

//   if (!watchlist.length) {
//     return (
//       <div className="p-6">
//         {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//         <p className="text-gray-400">Your watchlist is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//       <MovieList title="Saved Movies & TV Shows" movies={watchlist} />
//     </div>
//   );
// };

// export default Watchlist;






// import React from "react";
// import MovieList from "./MovieList";
// import useWatchlist from "../hooks/useWatchlist";

// const Watchlist = ({ hideTitle = false }) => {
//   const { watchlist } = useWatchlist();

//   if (!watchlist.length) {
//     return (
//       <div className="p-6">
//         {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//         <p className="text-gray-400">Your watchlist is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
//       <MovieList title="Saved Movies & TV Shows" movies={watchlist} />
//     </div>
//   );
// };

// export default Watchlist;





// components/Watchlist.jsx
import { useEffect, useState } from "react";
import useWatchlist from "../hooks/useWatchlist";
import MovieList from "./MovieList";
import api from "../services/api";

const fetchDetailsById = async (id) => {
  try {
    const movie = await api.get(`/movie/${id}`);
    return { ...movie.data, media_type: "movie" };
  } catch {
    try {
      const tv = await api.get(`/tv/${id}`);
      return { ...tv.data, media_type: "tv" };
    } catch {
      return null;
    }
  }
};

const Watchlist = ({ hideTitle = false }) => {
  const { watchlist: ids, loading } = useWatchlist();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    if (!ids?.length) {
      setItems([]);
      return;
    }
    (async () => {
      const results = await Promise.all(ids.map(fetchDetailsById));
      if (alive) setItems(results.filter(Boolean));
    })();
    return () => { alive = false; };
  }, [ids]);

  if (loading) {
    return (
      <div className="p-6">
        {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
        <p className="text-gray-400">Loading…</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="p-6">
        {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
        <p className="text-gray-400">Your watchlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {!hideTitle && <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>}
      <MovieList title="Saved Movies & TV Shows" movies={items} />
    </div>
  );
};

export default Watchlist;

