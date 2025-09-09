import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  if (!movies?.length) return null;

  return (
    <section className="p-4">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;




// // MovieList.jsx
// import MovieCard from "./MovieCard";

// const MovieList = ({
//   title,
//   movies = [],
//   favorites = [],
//   watchlist = [],
//   refreshData,      // <-- pass through
//   showButtons = false,
// }) => {
//   return (
//     <div className="mb-8">
//       {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {movies.map((m) => (
//           <MovieCard
//             key={m.id || m._id}
//             movie={m}
//             favorites={favorites}
//             watchlist={watchlist}
//             refreshData={refreshData}
//             showButtons={showButtons}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieList;





// import MovieCard from "./MovieCard";

// const MovieList = ({ 
//   movies, 
//   title, 
//   favorites = [], 
//   watchlist = [], 
//   refreshData 
// }) => {
//   if (!movies?.length) return null;

//   return (
//     <section className="p-4">
//       {title && <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>}
//       <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//         {movies.map((movie) => (
//           <MovieCard 
//             key={movie.id} 
//             movie={movie} 
//             favorites={favorites} 
//             watchlist={watchlist} 
//             refreshData={refreshData} 
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MovieList;
