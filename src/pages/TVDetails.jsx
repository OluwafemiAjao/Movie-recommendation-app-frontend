// import React, { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchTVShowDetails,
//   fetchTVShowCredits,
//   fetchSimilarTVShows,
//   fetchTVSeasonDetails,
//   fetchTVEpisodeDetails,
// } from "../services/tmdbService";
// import Reviews from "../components/Reviews";
// import TVShowList from "../components/TVShowList";
// import defaultPoster from "../assets/default.png";

// const TVDetails = () => {
//   const { id } = useParams();

//   const [details, setDetails] = useState(null);
//   const [credits, setCredits] = useState(null);
//   const [similarShows, setSimilarShows] = useState([]);
//   const [seasonDetails, setSeasonDetails] = useState(null);
//   const [episodeDetails, setEpisodeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadDetails = async () => {
//       setLoading(true);
//       try {
//         const [tvDetails, tvCredits, tvSimilar] = await Promise.all([
//           fetchTVShowDetails(id),
//           fetchTVShowCredits(id),
//           fetchSimilarTVShows(id),
//         ]);
//         setDetails(tvDetails);
//         setCredits(tvCredits);
//         setSimilarShows(tvSimilar.results || []);

//         // Fetch first season & first episode by default
//         if (tvDetails?.number_of_seasons > 0) {
//           const seasonNumber = 1;
//           const seasonData = await fetchTVSeasonDetails(id, seasonNumber);
//           setSeasonDetails(seasonData);

//           if (seasonData?.episodes?.length > 0) {
//             const episodeNumber = 1;
//             const episodeData = await fetchTVEpisodeDetails(
//               id,
//               seasonNumber,
//               episodeNumber
//             );
//             setEpisodeDetails(episodeData);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching TV details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadDetails();
//   }, [id]);

//   // Memoized genres
//   const genres = useMemo(() => {
//     return details?.genres?.map((g) => g.name).join(", ") || "N/A";
//   }, [details]);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (!details) return <p className="text-center">TV Show not found.</p>;

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={
//             details.poster_path
//               ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
//               : defaultPoster
//           }
//           alt={details.name}
//           className="w-64 rounded-2xl shadow-lg"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{details.name}</h1>
//           <p className="text-gray-400">{genres}</p>
//           <p className="mt-4">{details.overview}</p>
//           <p className="mt-2 text-sm text-gray-500">
//             First Air Date: {details.first_air_date}
//           </p>
//           <p className="mt-2 text-sm text-gray-500">
//             Seasons: {details.number_of_seasons} | Episodes:{" "}
//             {details.number_of_episodes}
//           </p>
//         </div>
//       </div>

//       {/* Cast */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Cast</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//           {credits?.cast?.slice(0, 8).map((actor) => (
//             <div key={actor.id} className="text-center">
//               <img
//                 src={
//                   actor.profile_path
//                     ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
//                     : defaultPoster
//                 }
//                 alt={actor.name}
//                 className="w-32 h-40 object-cover mx-auto rounded-lg shadow"
//               />
//               <p className="mt-2 text-sm">{actor.name}</p>
//               <p className="text-xs text-gray-500">{actor.character}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Season Details */}
//       {seasonDetails && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-semibold">
//             Season {seasonDetails.season_number}: {seasonDetails.name}
//           </h2>
//           <p className="mt-2">{seasonDetails.overview}</p>
//         </div>
//       )}

//       {/* Episode Details */}
//       {episodeDetails && (
//         <div className="mt-8">
//           <h3 className="text-xl font-semibold">
//             Episode {episodeDetails.episode_number}: {episodeDetails.name}
//           </h3>
//           <p className="mt-2">{episodeDetails.overview}</p>
//         </div>
//       )}

//       {/* Reviews */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Reviews</h2>
//         <Reviews mediaType="tv" id={id} />
//       </div>

//       {/* Similar Shows */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Similar TV Shows</h2>
//         <TVShowList shows={similarShows} />
//       </div>
//     </div>
//   );
// };

// export default TVDetails;





import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTVShowDetails,
  fetchTVShowCredits,
  fetchSimilarTVShows,
  fetchTVSeasonDetails,
  fetchTVEpisodeDetails,
} from "../services/tmdbService";
import MovieCredits from "../components/MovieCredits";
import TVShowList from "../components/TVShowList";
import defaultPoster from "../assets/default.png";

const TVDetails = () => {
  const { id } = useParams();

  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similarShows, setSimilarShows] = useState([]);
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [tvDetails, tvCredits, tvSimilar] = await Promise.all([
          fetchTVShowDetails(id),
          fetchTVShowCredits(id),
          fetchSimilarTVShows(id),
        ]);
        setDetails(tvDetails);
        setCredits(tvCredits);
        setSimilarShows(tvSimilar.results || []);

        // Fetch first season & first episode by default
        if (tvDetails?.number_of_seasons > 0) {
          const seasonNumber = 1;
          const seasonData = await fetchTVSeasonDetails(id, seasonNumber);
          setSeasonDetails(seasonData);

          if (seasonData?.episodes?.length > 0) {
            const episodeNumber = 1;
            const episodeData = await fetchTVEpisodeDetails(
              id,
              seasonNumber,
              episodeNumber
            );
            setEpisodeDetails(episodeData);
          }
        }
      } catch (err) {
        console.error("Error fetching TV details:", err);
        setError("Could not load TV show details.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  // Memoized genres
  const genres = useMemo(() => {
    return details?.genres?.map((g) => g.name).join(", ") || "N/A";
  }, [details]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!details) return <p className="text-center">TV Show not found.</p>;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : defaultPoster
          }
          alt={details.name}
          className="w-64 rounded-2xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{details.name}</h1>
          <p className="text-gray-400">{genres}</p>
          <p className="mt-4">{details.overview}</p>
          <p className="mt-2 text-sm text-gray-500">
            First Air Date: {details.first_air_date}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Seasons: {details.number_of_seasons} | Episodes:{" "}
            {details.number_of_episodes}
          </p>
        </div>
      </div>

      {/* Cast → links to PersonDetails */}
      <div className="mt-8">
        <MovieCredits credits={credits} />
      </div>

      {/* Season Details */}
      {seasonDetails && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">
            Season {seasonDetails.season_number}: {seasonDetails.name}
          </h2>
          <p className="mt-2">{seasonDetails.overview}</p>
        </div>
      )}

      {/* Episode Details */}
      {episodeDetails && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">
            Episode {episodeDetails.episode_number}: {episodeDetails.name}
          </h3>
          <p className="mt-2">{episodeDetails.overview}</p>
        </div>
      )}

      {/* Similar Shows → links to TVDetails */}
      <div className="mt-8">
        <TVShowList title="Similar TV Shows" shows={similarShows} />
      </div>
    </div>
  );
};

export default TVDetails;





