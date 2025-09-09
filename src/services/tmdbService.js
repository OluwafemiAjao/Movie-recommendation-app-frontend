// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = "https://api.themoviedb.org/3";

// export async function getPopularMovies() {
//   const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
//   if (!response.ok) throw new Error("Failed to fetch popular movies");
//   return response.json();
// }

// export async function getMovieDetails(movieId) {
//   const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
//   if (!response.ok) throw new Error("Failed to fetch movie details");
//   return response.json();
// }



// import api from './api';

// export const fetchPopularMovies = async () => {
//   try {
//     const response = await api.get('/movie/popular');
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch popular movies:', error);
//     return null;
//   }
// };

// export const fetchMovieDetails = async (movieId) => {
//   try {
//     const response = await api.get(`/movie/${movieId}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to fetch movie details for ID ${movieId}:`, error);
//     return [];
//   }
// };



// import api from "./api";

// export const fetchPopularMovies = async () => {
//   try {
//     const response = await api.get("/movie/popular");
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching popular movies:", error);
//     throw error;
//   }
// };

// export const fetchMovieDetails = async (id) => {
//   try {
//     const response = await api.get(`/movie/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching movie details for ID ${id}:`, error);
//     throw error;
//   }
// };

// export const searchMovies = async (query) => {
//   try {
//     const response = await api.get("/search/movie", {
//       params: {
//         query,
//       },
//     });
//     return response.data.results;
//   } catch (error) {
//     console.error(`Error searching for movies with query "${query}":`, error);
//     throw error;
//   }
// };




// import api from './api';

// // Simple in-memory cache
// const cache = new Map();

// /**
//  * Helper to handle API requests with consistent try/catch + caching.
//  * Caches by endpoint + params so repeated calls avoid hitting TMDB again.
//  */
// const fetchFromTMDB = async (endpoint, params = {}) => {
//   const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;

//   // Return from cache if available
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const { data } = await api.get(endpoint, { params });
//     cache.set(cacheKey, data); // Store in cache
//     return data;
//   } catch (error) {
//     console.error(`TMDB Fetch Error [${endpoint}]:`, error?.response || error.message);
//     throw error; // Let calling component decide how to handle it
//   }
// };

// // Movies
// export const fetchPopularMovies = () => fetchFromTMDB('/movie/popular');
// export const fetchTopRatedMovies = () => fetchFromTMDB('/movie/top_rated');
// export const fetchUpcomingMovies = () => fetchFromTMDB('/movie/upcoming');
// export const fetchNowPlayingMovies = () => fetchFromTMDB('/movie/now_playing');
// export const fetchMovieDetails = (movieId) => fetchFromTMDB(`/movie/${movieId}`);
// export const fetchMovieCredits = (movieId) => fetchFromTMDB(`/movie/${movieId}/credits`);
// export const fetchSimilarMovies = (movieId) => fetchFromTMDB(`/movie/${movieId}/similar`);

// // ✅ NEW: Trending movies (movies + TV + people) (timeWindow: "day" | "week")
// export const fetchTrendingMovies = (timeWindow = 'week') =>
//   fetchFromTMDB(`/trending/movie/${timeWindow}`);

// // ✅ NEW: Fetch movie videos (trailers, teasers, featurettes, clips, etc.)
// export const fetchMovieVideos = (movieId) =>
//   fetchFromTMDB(`/movie/${movieId}/videos`);

// // TV Shows
// export const fetchPopularTVShows = () => fetchFromTMDB('/tv/popular');
// export const fetchTopRatedTVShows = () => fetchFromTMDB('/tv/top_rated');
// export const fetchOnTheAirTVShows = () => fetchFromTMDB('/tv/on_the_air');
// export const fetchTVShowDetails = (tvId) => fetchFromTMDB(`/tv/${tvId}`);
// export const fetchTVShowCredits = (tvId) => fetchFromTMDB(`/tv/${tvId}/credits`);
// export const fetchSimilarTVShows = (tvId) => fetchFromTMDB(`/tv/${tvId}/similar`);

// // Search
// export const searchMovies = (query, page = 1) =>
//   fetchFromTMDB('/search/movie', { query, page });
// export const searchTVShows = (query, page = 1) =>
//   fetchFromTMDB('/search/tv', { query, page });

// // Genres (benefit most from caching)
// export const fetchMovieGenres = () => fetchFromTMDB('/genre/movie/list');
// export const fetchTVGenres = () => fetchFromTMDB('/genre/tv/list');

// // People
// export const fetchPersonDetails = (personId) => fetchFromTMDB(`/person/${personId}`);
// export const fetchPersonCredits = (personId) => fetchFromTMDB(`/person/${personId}/combined_credits`);

// // ✅ NEW: Fetch movies for a specific person (movie-only credits) (cast/crew credits)
// export const fetchPersonMovies = (personId) =>
//   fetchFromTMDB(`/person/${personId}/movie_credits`);







// import api from "./api";

// // Simple in-memory cache
// const cache = new Map();

// /**
//  * Helper: GET with try/catch + in-memory cache
//  * Cache key = endpoint + params
//  */
// const fetchFromTMDB = async (endpoint, params = {}) => {
//   const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
//   if (cache.has(cacheKey)) return cache.get(cacheKey);

//   try {
//     const { data } = await api.get(endpoint, { params });
//     cache.set(cacheKey, data);
//     return data;
//   } catch (error) {
//     console.error(`TMDB Fetch Error [${endpoint}]:`, error?.response || error.message);
//     throw error;
//   }
// };

// /* -------------------- Movies -------------------- */
// export const fetchPopularMovies = (page = 1) =>
//   fetchFromTMDB("/movie/popular", { page });

// export const fetchTopRatedMovies = (page = 1) =>
//   fetchFromTMDB("/movie/top_rated", { page });

// export const fetchUpcomingMovies = (page = 1) =>
//   fetchFromTMDB("/movie/upcoming", { page });

// export const fetchNowPlayingMovies = (page = 1) =>
//   fetchFromTMDB("/movie/now_playing", { page });

// export const fetchMovieDetails = (movieId) =>
//   fetchFromTMDB(`/movie/${movieId}`);

// export const fetchMovieCredits = (movieId) =>
//   fetchFromTMDB(`/movie/${movieId}/credits`);

// export const fetchSimilarMovies = (movieId, page = 1) =>
//   fetchFromTMDB(`/movie/${movieId}/similar`, { page });

// export const fetchMovieVideos = (movieId) =>
//   fetchFromTMDB(`/movie/${movieId}/videos`);

// export const fetchMovieImages = (movieId) =>
//   fetchFromTMDB(`/movie/${movieId}/images`);

// export const fetchMovieRecommendations = (movieId, page = 1) =>
//   fetchFromTMDB(`/movie/${movieId}/recommendations`, { page });

// export const fetchMovieReviews = (movieId, page = 1) =>
//   fetchFromTMDB(`/movie/${movieId}/reviews`, { page });

// export const fetchMovieGenres = () =>
//   fetchFromTMDB("/genre/movie/list");

// // // ✅ NEW: Trending movies (movies + TV + people) (timeWindow: "day" | "week")
// // export const fetchTrendingMovies = (timeWindow = 'week') =>
// //   fetchFromTMDB(`/trending/movie/${timeWindow}`);

// /* -------------------- TV -------------------- */
// export const fetchPopularTVShows = (page = 1) =>
//   fetchFromTMDB("/tv/popular", { page });

// export const fetchTopRatedTVShows = (page = 1) =>
//   fetchFromTMDB("/tv/top_rated", { page });

// export const fetchOnTheAirTVShows = (page = 1) =>
//   fetchFromTMDB("/tv/on_the_air", { page });

// export const fetchTVShowDetails = (tvId) =>
//   fetchFromTMDB(`/tv/${tvId}`);

// export const fetchTVShowCredits = (tvId) =>
//   fetchFromTMDB(`/tv/${tvId}/credits`);

// export const fetchSimilarTVShows = (tvId, page = 1) =>
//   fetchFromTMDB(`/tv/${tvId}/similar`, { page });

// export const fetchTVGenres = () =>
//   fetchFromTMDB("/genre/tv/list");

// // export const fetchTVSeasonDetails = async (tvId, seasonNumber) => {
// //   const { data } = await api.get(`/tv/${tvId}/season/${seasonNumber}`);
// //   return data;
// // };

// // export const fetchTVEpisodeDetails = async (tvId, seasonNumber, episodeNumber) => {
// //   const { data } = await api.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`);
// //   return data;
// // };

// // export const fetchAiringTodayTVShows = async () => {
// //   const res = await api.get("/tv/airing_today");
// //   return res.data.results;
// // };

// // export const fetchTVShowRecommendations = async (tvId) => {
// //   const res = await api.get(`/tv/${tvId}/recommendations`);
// //   return res.data.results;
// // };

// // export const fetchTVShowVideos = async (tvId) => {
// //   const res = await api.get(`/tv/${tvId}/videos`);
// //   return res.data.results;
// // };

// export const fetchMoviesByGenre = async (genreId, page = 1) => {
//   return fetchFromTMDB("/discover/movie", { with_genres: genreId, page });
// };

// export const fetchTVShowsByGenre = async (genreId, page = 1) => {
//   return fetchFromTMDB("/discover/tv", { with_genres: genreId, page });
// };

// /* -------------------- People -------------------- */
// export const fetchPersonDetails = (personId) =>
//   fetchFromTMDB(`/person/${personId}`);

// export const fetchPersonMovies = (personId) =>
//   fetchFromTMDB(`/person/${personId}/movie_credits`);

// export const fetchPersonTVShows = (personId) =>
//   fetchFromTMDB(`/person/${personId}/tv_credits`);

// // export const fetchPersonCredits = (personId) => fetchFromTMDB(`/person/${personId}/combined_credits`);

// // export const fetchPopularPeople = async () => {
// //   const res = await api.get("/person/popular");
// //   return res.data.results;
// // };

// /* -------------------- Search (kept for your SearchResults.jsx) -------------------- */
// export const searchMovies = (query, page = 1) =>
//   fetchFromTMDB("/search/movie", { query, page });

// export const searchTVShows = (query, page = 1) =>
//   fetchFromTMDB("/search/tv", { query, page });








import api from "./api";

// Simple in-memory cache
const cache = new Map();

/**
 * Helper: GET with try/catch + in-memory cache
 * Cache key = endpoint + params
 */
const fetchFromTMDB = async (endpoint, params = {}) => {
  const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const { data } = await api.get(endpoint, { params });
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`TMDB Fetch Error [${endpoint}]:`, error?.response || error.message);
    throw error;
  }
};

// =======================
// 🎬 Movies
// =======================

export const fetchPopularMovies = async () => {
  const { data } = await api.get("/movie/popular");
  return data;
};

export const fetchTopRatedMovies = async () => {
  const { data } = await api.get("/movie/top_rated");
  return data;
};

export const fetchUpcomingMovies = async () => {
  const { data } = await api.get("/movie/upcoming");
  return data;
};

export const fetchNowPlayingMovies = async () => {
  const { data } = await api.get("/movie/now_playing");
  return data;
};

export const fetchTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/week");
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCredits = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data;
};

export const fetchSimilarMovies = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/similar`);
  return data;
};

export const fetchMovieVideos = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/videos`);
  return data;
};

export const fetchMovieReviews = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/reviews`);
  return data;
};

export const fetchMovieImages = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/images`);
  return data;
};

export const fetchMovieRecommendations = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/recommendations`);
  return data;
};

// =======================
// 📺 TV Shows
// =======================

export const fetchPopularTVShows = async () => {
  const res = await api.get("/tv/popular");
  return res.data.results;
};

export const fetchTopRatedTVShows = async () => {
  const res = await api.get("/tv/top_rated");
  return res.data.results;
};

export const fetchOnTheAirTVShows = async () => {
  const res = await api.get("/tv/on_the_air");
  return res.data.results;
};

export const fetchTVShowDetails = async (tvId) => {
  const { data } = await api.get(`/tv/${tvId}`);
  return data;
};

export const fetchTVShowCredits = async (tvId) => {
  const { data } = await api.get(`/tv/${tvId}/credits`);
  return data;
};

export const fetchSimilarTVShows = async (tvId) => {
  const { data } = await api.get(`/tv/${tvId}/similar`);
  return data;
};

export const fetchTVEpisodeDetails = async (tvId, seasonNumber, episodeNumber) => {
  const { data } = await api.get(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`);
  return data;
};

// =======================
// 🔍 Search
// =======================

export const searchMovies = async (query) => {
  const { data } = await api.get(`/search/movie`, { params: { query } });
  return data;
};

export const searchTVShows = async (query) => {
  const { data } = await api.get(`/search/tv`, { params: { query } });
  return data;
};

// =======================
// 🏷️ Genres
// =======================

export const fetchMovieGenres = async () => {
  const { data } = await api.get("/genre/movie/list");
  return data;
};

export const fetchTVGenres = async () => {
  const { data } = await api.get("/genre/tv/list");
  return data;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  return fetchFromTMDB("/discover/movie", { with_genres: genreId, page });
};

export const fetchTVShowsByGenre = async (genreId, page = 1) => {
  return fetchFromTMDB("/discover/tv", { with_genres: genreId, page });
};

// =======================
// 👤 People
// =======================

export const fetchPersonDetails = async (personId) => {
  const { data } = await api.get(`/person/${personId}`);
  return data;
};

export const fetchPersonMovies = async (personId) => {
  const { data } = await api.get(`/person/${personId}/movie_credits`);
  return data;
};

export const fetchPersonCredits = async (personId) => {
  const { data } = await api.get(`/person/${personId}/combined_credits`);
  return data;
};

// ========== MISC ==========
export const fetchTVSeasonDetails = async (tvId, seasonNumber) => {
  const res = await api.get(`/tv/${tvId}/season/${seasonNumber}`);
  return res.data;
};