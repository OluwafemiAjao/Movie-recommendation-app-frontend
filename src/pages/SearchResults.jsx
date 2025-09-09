// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { searchMovies } from "../services/tmdbService";

// const useQuery = () => new URLSearchParams(useLocation().search);

// const SearchResults = () => {
//   const query = useQuery().get("q");
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (query) {
//       searchMovies(query)
//         .then(setResults)
//         .catch(console.error);
//     }
//   }, [query]);

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
//       {/* render results */}
//     </div>
//   );
// };

// export default SearchResults;




// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { searchMovies } from "../services/tmdbService";
// import MovieList from "../components/MovieList";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q");
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     if (query) {
//       searchMovies(query).then(setResults);
//     }
//   }, [query]);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
//       <MovieList movies={results} />
//     </div>
//   );
// };

// export default SearchResults;





// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { searchMovies } from "../services/tmdbService";
// import MovieList from "../components/MovieList";

// export default function SearchResults() {
//   const [params] = useSearchParams();
//   const query = params.get("q") || "";
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     async function run() {
//       if (!query.trim()) {
//         setResults([]);
//         return;
//       }
//       setLoading(true);
//       try {
//         const data = await searchMovies(query);
//         if (!isMounted) return;
//         setResults(data?.results || data || []);
//       } catch (e) {
//         console.error("Search error:", e);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }
//     run();
//     return () => { isMounted = false; };
//   }, [query]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">
//         Search Results {query ? `for “${query}”` : ""}
//       </h1>
//       {loading ? (
//         <div className="mt-4">Searching…</div>
//       ) : (
//         <MovieList movies={results} emptyText="No results." />
//       )}
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { searchMovies, searchTVShows } from "../services/tmdbService";
// import MovieList from "../components/MovieList";
// import TVShowList from "../components/TVShowList";

// const SearchResults = () => {
//   const [params] = useSearchParams();
//   const q = params.get("q") || "";
//   const [movies, setMovies] = useState([]);
//   const [tvShows, setTVShows] = useState([]);

//   useEffect(() => {
//     if (!q) return;

//     (async () => {
//       try {
//         const [movieRes, tvRes] = await Promise.all([
//           searchMovies(q),
//           searchTVShows(q),
//         ]);

//         setMovies(movieRes.results || []);
//         setTVShows(tvRes.results || []);
//       } catch (e) {
//         console.error("Search error:", e);
//       }
//     })();
//   }, [q]);

//   if (!q) return <p className="p-4">Type something to search…</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Search: “{q}”</h1>

//       {/* Movies Section */}
//       <MovieList title="Movies" movies={movies} />

//       {/* TV Shows Section */}
//       <TVShowList title="TV Shows" tvShows={tvShows} />
//     </div>
//   );
// };

// export default SearchResults;






import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchMovies, searchTVShows } from "../services/tmdbService";
import MovieList from "../components/MovieList";
import TVShowList from "../components/TVShowList";

const SearchResults = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";

  const [query, setQuery] = useState(q);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    if (!q) return;
    (async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          searchMovies(q),
          searchTVShows(q),
        ]);
        setMovies(movieRes.results || []);
        setTVShows(tvRes.results || []);
      } catch (e) {
        console.error("Search error:", e);
      }
    })();
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ✅ 🔎 Large Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          placeholder="Search for movies or TV shows..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-4 text-lg border rounded-lg shadow-md"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow"
        >
          Search
        </button>
      </form>

      {q ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Results for: “{q}”</h1>

          {/* ✅ Movie results → each card links to /movie/:id */}
          <MovieList title="Movies" movies={movies} />

          {/* ✅ TV results → each card links to /tv/:id */}
          <TVShowList title="TV Shows" tvShows={tvShows} />
        </>
      ) : (
        <p className="text-gray-500">Type something to search…</p>
      )}
    </div>
  );
};

export default SearchResults;

