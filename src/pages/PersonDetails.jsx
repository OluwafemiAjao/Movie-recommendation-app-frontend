// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchPersonDetails,
//   fetchPersonMovies,
//   fetchPersonCredits,
// } from "../services/tmdbService";
// import MovieList from "../components/MovieList";
// import TVShowList from "../components/TVShowList";

// const PersonDetails = () => {
//   const { id } = useParams();
//   const [person, setPerson] = useState(null);
//   const [movies, setMovies] = useState([]);
//   const [tvCredits, setTVCredits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     const loadPerson = async () => {
//       setLoading(true);
//       try {
//         const personData = await fetchPersonDetails(id);
//         const movieData = await fetchPersonMovies(id);
//         const tvData = await fetchPersonCredits(id);

//         setPerson(personData);
//         setMovies(movieData.cast || []);
//         setTVCredits(tvData.cast || []);
//       } catch (err) {
//         console.error("Failed to fetch person details:", err);
//         setError("Could not load person details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPerson();
//   }, [id]);

//   if (loading) return <p className="p-4">Loading person details...</p>;
//   if (error) return <p className="p-4 text-red-500">{error}</p>;
//   if (!person) return <p className="p-4">Person not found.</p>;

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row mb-6">
//         <img
//           src={
//             person.profile_path
//               ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
//               : "/default.png"
//           }
//           alt={person.name}
//           className="w-48 h-72 object-cover rounded-lg shadow-md"
//         />
//         <div className="md:ml-6 mt-4 md:mt-0">
//           <h1 className="text-3xl font-bold text-white">{person.name}</h1>
//           <p className="text-gray-400 italic mb-2">
//             {person.known_for_department}
//           </p>
//           <p className="text-gray-300">
//             {person.biography || "No biography available."}
//           </p>
//         </div>
//       </div>

//       {/* Movies */}
//       {movies.length > 0 ? (
//         <MovieList title="Movies" movies={movies} />
//       ) : (
//         <p className="mt-4 text-gray-400">No movies found.</p>
//       )}

//       {/* TV Shows */}
//       {tvCredits.length > 0 ? (
//         <TVShowList title="TV Shows" tvShows={tvCredits} />
//       ) : (
//         <p className="mt-4 text-gray-400">No TV shows found.</p>
//       )}
//     </div>
//   );
// };

// export default PersonDetails;






import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  fetchPersonCredits,
} from "../services/tmdbService";
import MovieList from "../components/MovieList";
import TVShowList from "../components/TVShowList";

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvCredits, setTVCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadPerson = async () => {
      setLoading(true);
      try {
        const personData = await fetchPersonDetails(id);
        const movieData = await fetchPersonMovies(id);
        const tvData = await fetchPersonCredits(id);

        setPerson(personData);
        setMovies(movieData.cast || []);
        setTVCredits(tvData.cast || []);
      } catch (err) {
        console.error("Failed to fetch person details:", err);
        setError("Could not load person details.");
      } finally {
        setLoading(false);
      }
    };

    loadPerson();
  }, [id]);

  if (loading) return <p className="p-4">Loading person details...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!person) return <p className="p-4">Person not found.</p>;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row mb-6">
        <img
          src={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
              : "/default.png"
          }
          alt={person.name}
          className="w-48 h-72 object-cover rounded-lg shadow-md"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-white">{person.name}</h1>
          <p className="text-gray-400 italic mb-2">
            {person.known_for_department}
          </p>
          <p className="text-gray-300">
            {person.biography || "No biography available."}
          </p>

          {/* Quick Navigation */}
          <div className="flex gap-4 mt-4">
            <Link to="/favorites" className="text-blue-400 hover:underline">
              View Favorites
            </Link>
            <Link to="/profile" className="text-blue-400 hover:underline">
              Your Profile
            </Link>
            <Link to="/" className="text-blue-400 hover:underline">
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Movies */}
      {movies.length > 0 ? (
        <MovieList title="Movies" movies={movies} />
      ) : (
        <p className="mt-4 text-gray-400">No movies found.</p>
      )}

      {/* TV Shows */}
      {tvCredits.length > 0 ? (
        <TVShowList title="TV Shows" tvShows={tvCredits} />
      ) : (
        <p className="mt-4 text-gray-400">No TV shows found.</p>
      )}
    </div>
  );
};

export default PersonDetails;

