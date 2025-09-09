// export default function Home() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Welcome to StarFlix</h1>
//       <p className="mt-2 text-gray-600">Explore trending and recommended movies just for you.</p>
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import { fetchPopularMovies } from '../services/tmdbService';
// import fallbackBanner from '../assets/banners/background_banner.jpg'; // Fallback

// const Home = () => {
//   const [banner, setBanner] = useState(null);

//   useEffect(() => {
//     const getBanner = async () => {
//       try {
//         const movies = await fetchPopularMovies();
//         const randomIndex = Math.floor(Math.random() * movies.length);
//         const randomMovie = movies[randomIndex];

//         setBanner(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
//       } catch (error) {
//         console.error('Failed to fetch popular movies:', error);
//         setBanner(fallbackBanner); // Use static fallback if API fails
//       }
//     };

//     getBanner();
//   }, []);

//   return (
//     <section className="relative h-[500px] w-full">
//       <img
//         src={banner || fallbackBanner}
//         alt="Starflix Hero Banner"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <h1 className="text-white text-5xl font-bold">Featured on StarFlix</h1>
//       </div>
//     </section>
//   );
// };

// export default Home;






// import React, { useState, useEffect } from 'react';
// import { fetchPopularMovies } from '../services/tmdbService';
// import staticBanner from '../assets/banners/background_banner.jpg';
// import banner1 from '../assets/banners/banner1.jpg';
// import banner2 from '../assets/banners/banner2.jpg';

// // 👇 Set useDynamic mode here: "true" or "false"
// const Home = ({ useDynamic = false }) => {
//   const [bannerURL, setBannerURL] = useState(staticBanner);

//   useEffect(() => {
//     if (useDynamic) {
//       const loadDynamicBanner = async () => {
//         try {
//           const banners = [banner1, banner2, staticBanner];
//           const index = Math.floor(Math.random() * banners.length);
//           setBannerURL(banners[index]);

//           // OR use TMDB API instead:
//           // const movies = await fetchPopularMovies();
//           // const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//           // setBannerURL(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
//         } catch (error) {
//           setBannerURL(staticBanner);
//         }
//       };

//       loadDynamicBanner();
//     }
//   }, [useDynamic]);

//   return (
//     <section className="relative h-[500px] w-full">
//       <img
//         src={bannerURL}
//         alt="Starflix Hero Banner"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <h1 className="text-white text-5xl font-bold">Welcome to StarFlix</h1>
//       </div>
//     </section>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from "react";
// import { fetchPopularMovies } from "../services/tmdbService";
// import MovieList from "../components/MovieList";
// import HeroBanner from "../components/HeroBanner";

// const Home = () => {
//   const [popularMovies, setPopularMovies] = useState([]);

//   useEffect(() => {
//     const loadMovies = async () => {
//       const movies = await fetchPopularMovies();
//       setPopularMovies(movies);
//     };
//     loadMovies();
//   }, []);

//   return (
//     <div>
//       <HeroBanner />
//       <MovieList movies={popularMovies} title="Popular Movies" />
//     </div>
//   );
// };

// export default Home;




// import React, { useState, useEffect } from "react";
// import HeroBanner from "../components/HeroBanner";
// import MovieList from "../components/MovieList";
// import { fetchPopularMovies } from "../services/tmdbService";

// const Home = () => {
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     fetchPopularMovies()
//       .then(setPopular)
//       .catch((error) => console.error("Error fetching popular movies:", error));
//   }, []);

//   return (
//     <div>
//       {/* HeroBanner handles its own fetching/logic */}
//       <HeroBanner mode="dynamic" />

//       {/* MovieList gets TMDB data fetched here */}
//       <MovieList movies={popular} title="Popular Movies" />
//     </div>
//   );
// };

// export default Home;




// import { useEffect, useState } from "react";
// import HeroBanner from "../components/HeroBanner";
// import MovieList from "../components/MovieList";
// import { fetchPopularMovies, fetchTrendingMovies } from "../services/tmdbService";

// export default function Home() {
//   const [popular, setPopular] = useState([]);
//   const [trending, setTrending] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function load() {
//       try {
//         const [popularRes, trendingRes] = await Promise.all([
//           fetchPopularMovies(),
//           fetchTrendingMovies("week"), // "day" | "week"
//         ]);

//         if (!isMounted) return;

//         setPopular(popularRes?.results || popularRes || []);
//         setTrending(trendingRes?.results || trendingRes || []);
//       } catch (e) {
//         console.error("Home load error:", e);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     load();
//     return () => { isMounted = false; };
//   }, []);

//   return (
//     <div className="space-y-8">
//       <HeroBanner mode="dynamic" />

//       {loading ? (
//         <div className="p-4">Loading…</div>
//       ) : (
//         <>
//           {/* Trending first for freshness */}
//           <MovieList movies={trending} title="Trending Now" />

//           {/* Popular section */}
//           <MovieList movies={popular} title="Popular Movies" />
//         </>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import HeroBanner from "../components/HeroBanner";
// import MovieList from "../components/MovieList";
// import {
//   fetchPopularMovies,
//   fetchTopRatedMovies,
//   fetchUpcomingMovies,
//   fetchNowPlayingMovies,
// } from "../services/tmdbService";

// const Home = () => {
//   const [popular, setPopular] = useState([]);
//   const [topRated, setTopRated] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [nowPlaying, setNowPlaying] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const [pop, top, upc, now] = await Promise.all([
//           fetchPopularMovies(),
//           fetchTopRatedMovies(),
//           fetchUpcomingMovies(),
//           fetchNowPlayingMovies(),
//         ]);
//         setPopular(pop.results || pop);
//         setTopRated(top.results || top);
//         setUpcoming(upc.results || upc);
//         setNowPlaying(now.results || now);
//       } catch (e) {
//         console.error(e);
//       }
//     })();
//   }, []);

//   return (
//     <div>
//       <HeroBanner mode="dynamic" />
//       <div className="space-y-10 p-4">
//         <MovieList title="Popular" movies={popular} />
//         <MovieList title="Top Rated" movies={topRated} />
//         <MovieList title="Upcoming" movies={upcoming} />
//         <MovieList title="Now Playing" movies={nowPlaying} />
//       </div>
//     </div>
//   );
// };

// export default Home;







import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchOnTheAirTVShows,
} from "../services/tmdbService";
import MovieList from "../components/MovieList";
import TVShowList from "../components/TVShowList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [onTheAirTV, setOnTheAirTV] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          popularMoviesData,
          topRatedMoviesData,
          upcomingMoviesData,
          nowPlayingMoviesData,
          trendingMoviesData,
          popularTVData,
          topRatedTVData,
          onTheAirTVData,
        ] = await Promise.all([
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchUpcomingMovies(),
          fetchNowPlayingMovies(),
          fetchTrendingMovies(),
          fetchPopularTVShows(),
          fetchTopRatedTVShows(),
          fetchOnTheAirTVShows(),
        ]);

        setPopularMovies(popularMoviesData.results || popularMoviesData || []);
        setTopRatedMovies(topRatedMoviesData.results || topRatedMoviesData || []);
        setUpcomingMovies(upcomingMoviesData.results || upcomingMoviesData || []);
        setNowPlayingMovies(nowPlayingMoviesData.results || nowPlayingMoviesData || []);
        setTrendingMovies(trendingMoviesData.results || trendingMoviesData || []);
        setPopularTV(popularTVData.results || popularTVData || []);
        setTopRatedTV(topRatedTVData.results || topRatedTVData || []);
        setOnTheAirTV(onTheAirTVData.results || onTheAirTVData || []);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load home content. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading content...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 pb-10">
      {/* Hero – TMDB main with local randomized fallback (Version 1) */}
      <HeroBanner mode="dynamic" />

      {/* Movies Sections (cards link to /movie/:id) */}
      <MovieList title="Trending Movies" movies={trendingMovies} />
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Top Rated Movies" movies={topRatedMovies} />
      <MovieList title="Upcoming Movies" movies={upcomingMovies} />
      <MovieList title="Now Playing Movies" movies={nowPlayingMovies} />

      {/* TV Shows Sections (cards link to /tv/:id) */}
      <TVShowList title="Popular TV Shows" tvShows={popularTV} />
      <TVShowList title="Top Rated TV Shows" tvShows={topRatedTV} />
      <TVShowList title="Currently Airing TV Shows" tvShows={onTheAirTV} />
    </div>
  );
};

export default Home;










