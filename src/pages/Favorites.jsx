// import React from "react";
// import useFavorites from "../hooks/useFavorites";
// import MovieList from "../components/MovieList";

// const Favorites = () => {
//   const { favorites } = useFavorites();

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
//       {/* <MovieList movies={favorites} /> */}
//       <MovieList title="Favorite Movies" movies={favorites} /> 
//     </div>
//   );
// };

// export default Favorites;





// import React from "react";
// import useFavorites from "../hooks/useFavorites";
// import MovieList from "../components/MovieList";

// const Favorites = () => {
//   const { favorites } = useFavorites();

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
//       {favorites.length > 0 ? (
//         // ✅ MovieList already wraps each card with Link → MovieDetails
//         <MovieList title="Favorite Movies" movies={favorites} />
//       ) : (
//         <p className="text-gray-400">You have no favorites yet.</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;




// import { useEffect, useState } from "react";
// import { getFavorites } from "../services/favoriteService";
// import MovieList from "../components/MovieList";

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     getFavorites()
//       .then(setFavorites)
//       .catch(() => setFavorites([]));
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
//       {favorites.length > 0 ? (
//         <MovieList title="Favorite Movies" movies={favorites} />
//       ) : (
//         <p className="text-gray-400">You have no favorites yet.</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;





// import React from "react";
// import useFavorites from "../hooks/useFavorites";
// import MovieList from "../components/MovieList";

// const Favorites = () => {
//   const { favorites } = useFavorites();

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
//       {favorites.length > 0 ? (
//         <MovieList title="Favorite Movies" movies={favorites} />
//       ) : (
//         <p className="text-gray-400">You have no favorites yet.</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;




// pages/Favorites.jsx
import { useEffect, useState } from "react";
import useFavorites from "../hooks/useFavorites";
import MovieList from "../components/MovieList";
import api from "../services/api"; // your TMDB axios instance (with api_key)

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

const Favorites = () => {
  const { favorites: ids, loading } = useFavorites();
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

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
      {items.length ? (
        <MovieList title="Favorite Movies & TV Shows" movies={items} />
      ) : (
        <p className="text-gray-400">You have no favorites yet.</p>
      )}
    </div>
  );
};

export default Favorites;


