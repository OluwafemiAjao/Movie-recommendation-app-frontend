// import React from 'react';
// import defaultImage from '../assets/default.png';

// const MovieCard = ({ movie }) => {
//   const imageURL = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//     : defaultImage;

//   return (
//     <div className="movie-card">
//       <img src={imageURL} alt={movie.title} className="rounded-lg w-full h-auto object-cover" />
//       <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
//     </div>
//   );
// };

// export default MovieCard;





// import defaultImage from "../assets/default.png";
// import useFavorites from "../hooks/useFavorites";

// const MovieCard = ({ movie }) => {
//   const imageURL = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//     : defaultImage;

//   const { favorites, toggleFavorite } = useFavorites();
//   const isFavorite = favorites.some((fav) => fav.id === movie.id);

//   return (
//     <div className="movie-card bg-gray-900 p-3 rounded-lg shadow">
//       <img
//         src={imageURL}
//         alt={movie.title}
//         className="rounded-lg w-full h-auto object-cover"
//       />
//       <h2 className="text-lg font-semibold mt-2 text-white">{movie.title}</h2>
//       <button
//         onClick={() => toggleFavorite(movie)}
//         className={`mt-2 px-3 py-1 rounded ${
//           isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
//         }`}
//       >
//         {isFavorite ? "Remove Favorite" : "Add to Favorites"}
//       </button>
//     </div>
//   );
// };

// export default MovieCard;





// import defaultImage from "../assets/default.png";
// import useFavorites from "../hooks/useFavorites";
// import useWatchlist from "../hooks/useWatchlist";

// const MovieCard = ({ movie }) => {
//   const imageURL = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//     : defaultImage;

//   const title = movie.title || movie.name || "Untitled";

//   const { favorites, toggleFavorite } = useFavorites();
//   const isFavorite = favorites.some((fav) => fav.id === movie.id);

//   const { isInWatchlist, toggleWatchlist } = useWatchlist();
//   const inWatchlist = isInWatchlist(movie.id);

//   return (
//     <div className="movie-card bg-gray-900 p-3 rounded-lg shadow">
//       <img
//         src={imageURL}
//         alt={title}
//         className="rounded-lg w-full h-auto object-cover"
//       />
//       <h2 className="text-lg font-semibold mt-2 text-white">{title}</h2>

//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={() => toggleFavorite(movie)}
//           className={`px-3 py-1 rounded ${
//             isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {isFavorite ? "Unfavorite" : "Favorite"}
//         </button>

//         <button
//           onClick={() => toggleWatchlist(movie)}
//           className={`px-3 py-1 rounded ${
//             inWatchlist ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {inWatchlist ? "Remove" : "Watchlist"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;




// import defaultImage from "../assets/default.png";
// import {
//   addFavorite,
//   removeFavorite,
// } from "../services/favoriteService";
// import {
//   addToWatchlist,
//   removeFromWatchlist,
// } from "../services/watchlistService";

// const MovieCard = ({ movie, favorites = [], watchlist = [], refreshData }) => {
//   const imageURL = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//     : defaultImage;

//   const title = movie.title || movie.name || "Untitled";

//   const isFavorite = favorites.some((fav) => fav.id === movie.id);
//   const inWatchlist = watchlist.some((item) => item.id === movie.id);

//   const handleFavorite = async () => {
//     if (isFavorite) {
//       await removeFavorite(movie.id);
//     } else {
//       await addFavorite(movie);
//     }
//     refreshData && refreshData(); // ✅ refresh parent list after update
//   };

//   const handleWatchlist = async () => {
//     if (inWatchlist) {
//       await removeFromWatchlist(movie.id);
//     } else {
//       await addToWatchlist(movie);
//     }
//     refreshData && refreshData();
//   };

//   return (
//     <div className="movie-card bg-gray-900 p-3 rounded-lg shadow">
//       <img
//         src={imageURL}
//         alt={title}
//         className="rounded-lg w-full h-auto object-cover"
//       />
//       <h2 className="text-lg font-semibold mt-2 text-white">{title}</h2>

//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={handleFavorite}
//           className={`px-3 py-1 rounded ${
//             isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {isFavorite ? "Unfavorite" : "Favorite"}
//         </button>

//         <button
//           onClick={handleWatchlist}
//           className={`px-3 py-1 rounded ${
//             inWatchlist ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {inWatchlist ? "Remove" : "Watchlist"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;





// import defaultImage from "../assets/default.png";
// import useFavorites from "../hooks/useFavorites";
// import useWatchlist from "../hooks/useWatchlist";

// const MovieCard = ({ movie }) => {
//   const imageURL = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
//     : defaultImage;

//   const title = movie.title || movie.name || "Untitled";

//   // Hook-based global state (backed by service calls inside hooks)
//   const { favorites, toggleFavorite } = useFavorites();
//   const isFavorite = favorites.some((fav) => fav.id === movie.id);

//   const { isInWatchlist, toggleWatchlist } = useWatchlist();
//   const inWatchlist = isInWatchlist(movie.id);

//   return (
//     <div className="movie-card bg-gray-900 p-3 rounded-lg shadow">
//       <img
//         src={imageURL}
//         alt={title}
//         className="rounded-lg w-full h-auto object-cover"
//       />
//       <h2 className="text-lg font-semibold mt-2 text-white">{title}</h2>

//       <div className="flex gap-2 mt-2">
//         {/* Favorites */}
//         <button
//           onClick={() => toggleFavorite(movie)}
//           className={`px-3 py-1 rounded ${
//             isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {isFavorite ? "Unfavorite" : "Favorite"}
//         </button>

//         {/* Watchlist */}
//         <button
//           onClick={() => toggleWatchlist(movie)}
//           className={`px-3 py-1 rounded ${
//             inWatchlist ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
//           }`}
//         >
//           {inWatchlist ? "Remove" : "Watchlist"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;




import defaultImage from "../assets/default.png";
import useFavorites from "../hooks/useFavorites";
import useWatchlist from "../hooks/useWatchlist";

const MovieCard = ({ movie }) => {
  const imageURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : defaultImage;

  const title = movie.title || movie.name || "Untitled";

  // Favorites hook (service-backed)
  const { isFavorite, toggleFavorite } = useFavorites();

  // Watchlist hook (already working fine)
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  return (
    <div className="movie-card bg-gray-900 p-3 rounded-lg shadow">
      <img
        src={imageURL}
        alt={title}
        className="rounded-lg w-full h-auto object-cover"
      />
      <h2 className="text-lg font-semibold mt-2 text-white">{title}</h2>

      <div className="flex gap-2 mt-2">
        {/* Favorites */}
        <button
          onClick={() => toggleFavorite(movie)}
          className={`px-3 py-1 rounded ${
            isFavorite(movie.id) ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {isFavorite(movie.id) ? "Unfavorite" : "Favorite"}
        </button>

        {/* Watchlist */}
        <button
          onClick={() => toggleWatchlist(movie)}
          className={`px-3 py-1 rounded ${
            isInWatchlist(movie.id) ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {isInWatchlist(movie.id) ? "Remove" : "Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
