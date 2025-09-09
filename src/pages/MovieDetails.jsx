// import { useParams } from "react-router-dom";

// export default function MovieDetails() {
//   const { id } = useParams();
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">StarFlix Movie Details</h2>
//       <p className="text-gray-600 mt-2">Movie ID: {id}</p>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchMovieDetails } from "../services/tmdbService";
// import Reviews from "../components/Reviews"; // 

// function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     fetchMovieDetails(id)
//       .then((data) => setMovie(data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold">{movie.title}</h1>
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//         className="mt-4 rounded"
//       />
//       <p className="mt-4">{movie.overview}</p>

//       {/* ✅ Add reviews section */}
//       <Reviews movieId={id} />
//     </div>
//   );
// }

// export default MovieDetails;





// import { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchMovieDetails,
//   fetchMovieCredits,
//   fetchSimilarMovies,
//   fetchMovieVideos,
// } from "../services/tmdbService";
// import Reviews from "../components/Reviews";
// import MovieList from "../components/MovieList";

// export default function MovieDetails() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [credits, setCredits] = useState(null);
//   const [similar, setSimilar] = useState([]);
//   const [videos, setVideos] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const posterUrl = useMemo(() => (
//     movie?.poster_path
//       ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//       : "/assets/default.png"
//   ), [movie]);

//   const trailer = useMemo(() => {
//     const results = videos?.results || [];
//     return results.find(v => v.site === "YouTube" && v.type === "Trailer")
//         || results.find(v => v.site === "YouTube"); // any YouTube fallback
//   }, [videos]);

//   useEffect(() => {
//     let isMounted = true;

//     async function load() {
//       setLoading(true);
//       try {
//         const [d, c, s, v] = await Promise.all([
//           fetchMovieDetails(id),
//           fetchMovieCredits(id),
//           fetchSimilarMovies(id),
//           fetchMovieVideos(id),
//         ]);

//         if (!isMounted) return;

//         setMovie(d);
//         setCredits(c);
//         setSimilar(s?.results || s || []);
//         setVideos(v);
//       } catch (e) {
//         console.error("MovieDetails load error:", e);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     load();
//     return () => { isMounted = false; };
//   }, [id]);

//   if (loading) return <div className="p-4">Loading…</div>;
//   if (!movie) return <div className="p-4">Not found.</div>;

//   return (
//     <div className="p-4 space-y-8">
//       {/* Title + Poster + Overview */}
//       <div className="grid md:grid-cols-[200px,1fr] gap-6">
//         <img
//           src={posterUrl}
//           alt={movie.title}
//           className="rounded-xl w-full h-auto object-cover bg-gray-800"
//           onError={(e) => (e.currentTarget.src = "/assets/default.png")}
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{movie.title}</h1>
//           <p className="mt-3 text-gray-300">{movie.overview || "No overview available."}</p>

//           <div className="mt-4 text-sm text-gray-400 space-x-4">
//             <span>Release: {movie.release_date || "—"}</span>
//             <span>Runtime: {movie.runtime ? `${movie.runtime} min` : "—"}</span>
//             <span>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}</span>
//           </div>
//         </div>
//       </div>

//       {/* Trailer (YouTube embed) */}
//       {trailer && (
//         <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
//           <iframe
//             key={trailer.key}
//             title={trailer.name}
//             className="w-full h-full"
//             src={`https://www.youtube.com/embed/${trailer.key}`}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         </div>
//       )}

//       {/* Top Billed Cast */}
//       {credits?.cast?.length > 0 && (
//         <section>
//           <h2 className="text-2xl font-semibold mb-3">Top Billed Cast</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
//             {credits.cast.slice(0, 12).map((person) => (
//               <div key={person.cast_id || person.credit_id || person.id} className="text-center">
//                 <img
//                   className="w-full h-44 object-cover rounded-lg bg-gray-800"
//                   src={
//                     person.profile_path
//                       ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
//                       : "/assets/default.png"
//                   }
//                   alt={person.name}
//                   onError={(e) => (e.currentTarget.src = "/assets/default.png")}
//                 />
//                 <div className="mt-2 text-sm">
//                   <p className="font-medium">{person.name}</p>
//                   <p className="text-gray-400">{person.character || "—"}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Similar Movies */}
//       {similar?.length > 0 && (
//         <section>
//           <MovieList title="Similar Movies" movies={similar} />
//         </section>
//       )}

//       {/* Reviews (your persisted local-storage component) */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
//         <Reviews movieId={id} movieTitle={movie.title} />
//       </section>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchMovieDetails,
//   fetchMovieCredits,
//   fetchSimilarMovies,
//   fetchMovieVideos,
//   fetchMovieReviews,
// } from "../services/tmdbService";
// import MovieList from "../components/MovieList";
// import Reviews from "../components/Reviews";
// import defaultPoster from "../assets/default.png";

// const MovieDetails = () => {
//   const { id } = useParams();

//   const [movie, setMovie] = useState(null);
//   const [credits, setCredits] = useState(null);
//   const [similar, setSimilar] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [tmdbReviews, setTmdbReviews] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const [m, c, s, v, r] = await Promise.all([
//           fetchMovieDetails(id),
//           fetchMovieCredits(id),
//           fetchSimilarMovies(id),
//           fetchMovieVideos(id),
//           fetchMovieReviews(id),
//         ]);
//         setMovie(m);
//         setCredits(c);
//         setSimilar(s.results || []);
//         setVideos(v.results || []);
//         setTmdbReviews(r.results || []);
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, [id]);

//   if (!movie) return <p className="p-4">Loading...</p>;

//   const posterSrc =
//     movie.poster_path
//       ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//       : defaultPoster;

//   return (
//     <div className="p-4 space-y-8">
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={posterSrc}
//           alt={movie.title}
//           className="w-full max-w-xs rounded"
//         />
//         <div>
//           <h1 className="text-3xl font-bold">{movie.title}</h1>
//           <p className="mt-4 opacity-90">{movie.overview}</p>
//           {credits?.cast?.length ? (
//             <div className="mt-4">
//               <h2 className="text-xl font-semibold mb-2">Cast</h2>
//               <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
//                 {credits.cast.slice(0, 9).map((p) => (
//                   <li key={p.cast_id || `${p.credit_id}-${p.id}`}>
//                     {p.name} <span className="opacity-70">as</span> {p.character}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : null}
//         </div>
//       </div>

//       {videos.length ? (
//         <section>
//           <h2 className="text-xl font-semibold mb-3">Videos</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {videos.slice(0, 6).map((v) => (
//               <iframe
//                 key={v.id}
//                 className="w-full aspect-video rounded"
//                 src={`https://www.youtube.com/embed/${v.key}`}
//                 title={v.name}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             ))}
//           </div>
//         </section>
//       ) : null}

//       {tmdbReviews.length ? (
//         <section>
//           <h2 className="text-xl font-semibold mb-3">TMDB Reviews</h2>
//           <div className="space-y-4">
//             {tmdbReviews.slice(0, 5).map((rev) => (
//               <div key={rev.id} className="border border-white/10 rounded p-3">
//                 <div className="text-sm opacity-70 mb-1">
//                   {rev.author} • {new Date(rev.created_at).toLocaleDateString()}
//                 </div>
//                 <p className="text-sm">{rev.content}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       ) : null}

//       {/* Your local user reviews (persisted in localStorage) */}
//       <section>
//         <Reviews movieId={id} />
//       </section>

//       <section>
//         <MovieList title="Similar Movies" movies={similar} />
//       </section>
//     </div>
//   );
// };

// export default MovieDetails;







import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieRecommendations,
  fetchMovieImages,
  fetchMovieVideos,
  fetchSimilarMovies,
} from "../services/tmdbService";
import Reviews from "../components/Reviews";
import MovieCredits from "../components/MovieCredits";
import MovieImages from "../components/MovieImages";
import MovieList from "../components/MovieList";
import defaultPoster from "../assets/default.png";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieData = async () => {
      setLoading(true);
      try {
        const [
          detailsData,
          creditsData,
          reviewsData,
          recommendationsData,
          imagesData,
          videosData,
          similarData,
        ] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieReviews(id),
          fetchMovieRecommendations(id),
          fetchMovieImages(id),
          fetchMovieVideos(id),
          fetchSimilarMovies(id),
        ]);

        setMovie(detailsData);
        setCredits(creditsData);
        setReviews(reviewsData?.results || []);
        setRecommendations(recommendationsData?.results || []);
        setImages(imagesData);
        setVideos(videosData?.results || []);
        setSimilar(similarData?.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, [id]);

  // Memoize the poster URL (optimization)
  const posterUrl = useMemo(() => {
    return movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : defaultPoster;
  }, [movie]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found</p>;

  return (
    <div className="p-6">
      {/* Movie Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-64 rounded-2xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 italic">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>
          <p className="mt-2 text-sm text-gray-300">
            Release Date: {movie.release_date}
          </p>
          <p className="text-sm text-gray-300">Rating: {movie.vote_average}/10</p>
        </div>
      </div>

      {/* Movie Credits || Cast & Crew (links to PersonDetails) */}
      {credits && <MovieCredits credits={credits} />}

      {/* Images */}
      {images && <MovieImages images={images} />}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Videos</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <iframe
                key={video.id}
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviews.length > 0 && <Reviews reviews={reviews} />}

      {/* Recommendations → navigates to MovieDetails */}
      {recommendations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Recommendations</h2>
          <MovieList movies={recommendations} />
        </div>
      )}

      {/* Similar Movies → navigates to MovieDetails */}
      {similar.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-3">Similar Movies</h2>
          <MovieList movies={similar} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
