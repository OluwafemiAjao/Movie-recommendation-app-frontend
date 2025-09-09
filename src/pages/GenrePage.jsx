// import { useEffect, useState } from "react";
// import { fetchMovieGenres, fetchTVGenres } from "../services/tmdbService";

// const GenrePage = () => {
//   const [movieGenres, setMovieGenres] = useState([]);
//   const [tvGenres, setTVGenres] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const movieRes = await fetchMovieGenres();
//         setMovieGenres(movieRes.genres || []);

//         const tvRes = await fetchTVGenres();
//         setTVGenres(tvRes.genres || []);
//       } catch (err) {
//         console.error("Failed to fetch genres:", err);
//       }
//     })();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">Genres</h1>

//       {/* Movie Genres */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-3 text-white">Movie Genres</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {movieGenres.map((genre) => (
//             <div
//               key={genre.id}
//               className="bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition text-center text-white"
//             >
//               {genre.name}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TV Genres */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3 text-white">TV Genres</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {tvGenres.map((genre) => (
//             <div
//               key={genre.id}
//               className="bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition text-center text-white"
//             >
//               {genre.name}
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default GenrePage;





// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   fetchMovieGenres,
//   fetchTVGenres,
//   fetchMoviesByGenre,
//   fetchTVShowsByGenre,
// } from "../services/tmdbService";
// import MovieList from "../components/MovieList";
// import TVShowList from "../components/TVShowList";

// const GenrePage = () => {
//   const { type, id: genreId } = useParams(); 
//   const [genres, setGenres] = useState([]);
//   const [content, setContent] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch genres (list of categories)
//   useEffect(() => {
//     if (!type) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = type === "movie" ? await fetchMovieGenres() : await fetchTVGenres();
//         setGenres(res?.genres || []);
//       } catch (err) {
//         console.error("Failed to fetch genres:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [type]);

//   // Fetch movies/TV shows by genreId
//   useEffect(() => {
//     if (!type || !genreId) return;
//     (async () => {
//       try {
//         setLoading(true);
//         const res =
//           type === "movie"
//             ? await fetchMoviesByGenre(genreId)
//             : await fetchTVShowsByGenre(genreId);
//         setContent(res?.results || []);
//       } catch (err) {
//         console.error("Failed to fetch content:", err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [type, genreId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         {genreId ? `Genre Content` : `${type === "movie" ? "Movie" : "TV"} Genres`}
//       </h1>

//       {/* Directory page (genre list) */}
//       {!genreId && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {genres.map((genre) => (
//             <Link
//               key={genre.id}
//               to={`/genre/${type}/${genre.id}`}
//               className="p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 text-center"
//             >
//               {genre.name}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Rendering page (movies/TV shows by genre) */}
//       {genreId && (
//         <div className="mt-6">
//           {loading ? (
//             <p>Loading...</p>
//           ) : type === "movie" ? (
//             <MovieList title="Movies" movies={content} />
//           ) : (
//             <TVShowList title="TV Shows" tvShows={content} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenrePage;






import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchMovieGenres,
  fetchTVGenres,
  fetchMoviesByGenre,
  fetchTVShowsByGenre,
} from "../services/tmdbService";
import MovieList from "../components/MovieList";
import TVShowList from "../components/TVShowList";

const GenrePage = () => {
  const { id: genreId } = useParams(); // expects route like /genre/:id (undefined on /genres)
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all genres on mount || Load genres for the directory view
  useEffect(() => {
    (async () => {
      try {
        setLoadingGenres(true);
        const [mg, tg] = await Promise.all([fetchMovieGenres(), fetchTVGenres()]);
        setMovieGenres(mg?.genres || []);
        setTVGenres(tg?.genres || []);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Could not load genres.");
      } finally {
        setLoadingGenres(false);
      }
    })();
  }, []);

  // Fetch content (movies + tv shows) when a genre is selected || Load titles for a selected genre
  useEffect(() => {
    if (!genreId) return;
    (async () => {
      try {
        setLoadingContent(true);
        const [mRes, tRes] = await Promise.all([
          fetchMoviesByGenre(genreId),
          fetchTVShowsByGenre(genreId),
        ]);
        setMovies(mRes?.results || []);
        setTvShows(tRes?.results || []);
      } catch (err) {
        console.error("Failed to fetch genre content:", err);
        setError("Could not load genre content.");
      } finally {
        setLoadingContent(false);
      }
    })();
  }, [genreId]);

  // Figure out selected genre name for header
  const selectedGenreName = useMemo(() => {
    if (!genreId) return null;
    const idNum = Number(genreId);
    return (
      movieGenres.find((g) => g.id === idNum)?.name ||
      tvGenres.find((g) => g.id === idNum)?.name ||
      null
    );
  }, [genreId, movieGenres, tvGenres]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Genres</h1>

      {/* Directory (lists all genres) */}
      {loadingGenres ? (
        <p>Loading genres...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Movie Genres */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Movie Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movieGenres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genres/${genre.id}`}   // ✅ navigation works
                  className={`p-3 rounded-lg text-center transition ${
                    genreId === String(genre.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </section>

          {/* TV Genres */}
          <section>
            <h2 className="text-xl font-semibold mb-4">TV Genres</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tvGenres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genres/${genre.id}`}   // ✅ navigation works
                  className={`p-3 rounded-lg text-center transition ${
                    genreId === String(genre.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Selected Genre Content */}
      {genreId && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">
            {selectedGenreName
              ? `Genre: ${selectedGenreName}`
              : `Genre ID: ${genreId}`}
          </h2>

          {loadingContent ? (
            <p>Loading content...</p>
          ) : (
            <>
              <section className="mb-10">
                <MovieList title="Movies" movies={movies} />
              </section>
              <section>
                <TVShowList title="TV Shows" tvShows={tvShows} />
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GenrePage;