// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="bg-black text-white px-6 py-4">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="text-xl font-semibold">🎬 StarFlix</Link>
//       </div>
//     </nav>
//   );
// }



// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="StarFlix Logo" className="h-10 w-10 object-contain rounded-full" />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       <div className="space-x-6">
//         <Link to="/" className="hover:text-red-500 transition duration-200">Home</Link>
//         <Link to="/search" className="hover:text-red-500 transition duration-200">Search</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import { Link } from "react-router-dom";
// import { useState } from "react";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [isGenreOpen, setIsGenreOpen] = useState(false);

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="StarFlix Logo" className="h-10 w-10 object-contain rounded-full" />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       {/* Links */}
//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-red-500 transition duration-200">Home</Link>
//         <Link to="/search" className="hover:text-red-500 transition duration-200">Search</Link>
//         <Link to="/favorites" className="hover:text-red-500 transition duration-200">Favorites</Link>
//         <Link to="/profile" className="hover:text-red-500 transition duration-200">Profile</Link>

//         {/* Genres Dropdown */}
//         <div
//           className="relative inline-block"
//           onMouseEnter={() => setIsGenreOpen(true)}
//           onMouseLeave={() => setIsGenreOpen(false)}
//         >
//           <button className="hover:text-red-500 transition duration-200">Genres ▾</button>
//           {isGenreOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-lg shadow-lg z-50">
//               <Link
//                 to="/genre/movie"
//                 className="block px-4 py-2 hover:bg-gray-700"
//               >
//                 Movie Genres
//               </Link>
//               <Link
//                 to="/genre/tv"
//                 className="block px-4 py-2 hover:bg-gray-700"
//               >
//                 TV Genres
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import logo from "../assets/logo.png";
// import { fetchMovieGenres } from "../services/tmdbService"; // ✅ dynamic genres from TMDB

// const Navbar = () => {
//   const [popularGenres, setPopularGenres] = useState([]);

//   useEffect(() => {
//     const loadGenres = async () => {
//       try {
//         const movieGenres = await fetchMovieGenres();
//         // Pick just a few common ones dynamically instead of hardcoding
//         const filtered = movieGenres.filter(g => 
//           ["Action", "Comedy", "Drama"].includes(g.name)
//         );
//         setPopularGenres(filtered);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };
//     loadGenres();
//   }, []);

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="StarFlix Logo" className="h-10 w-10 object-contain rounded-full" />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-red-500 transition duration-200">Home</Link>
//         <Link to="/search" className="hover:text-red-500 transition duration-200">Search</Link>

//         {/* ✅ Genres Dropdown */}
//         <div className="relative group inline-block">
//           <button className="hover:text-red-500 transition duration-200">
//             Genres ▾
//           </button>
//           <div className="absolute hidden group-hover:block bg-gray-800 text-sm mt-2 rounded-lg shadow-lg w-40">
//             {/* Dynamic Popular Genres */}
//             {popularGenres.map((genre) => (
//               <Link
//                 key={genre.id}
//                 to={`/genres/movies/${genre.id}`}
//                 className="block px-4 py-2 hover:bg-gray-700"
//               >
//                 {genre.name}
//               </Link>
//             ))}

//             <hr className="border-gray-700 my-1" />

//             {/* Links to full Genre Pages */}
//             <Link to="/genres/movies" className="block px-4 py-2 hover:bg-gray-700">
//               All Movie Genres
//             </Link>
//             <Link to="/genres/tv" className="block px-4 py-2 hover:bg-gray-700">
//               All TV Genres
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { fetchMovieGenres, fetchTVGenres } from "../services/tmdbService";

// const POPULAR_MOVIE_NAMES = ["Action", "Comedy", "Drama", "Thriller"];
// const POPULAR_TV_NAMES = ["Drama", "Comedy", "Action & Adventure", "Animation"];

// const Navbar = () => {
//   const [isGenreOpen, setIsGenreOpen] = useState(false);
//   const [movieGenres, setMovieGenres] = useState([]);
//   const [tvGenres, setTVGenres] = useState([]);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const [mg, tg] = await Promise.all([fetchMovieGenres(), fetchTVGenres()]);
//         setMovieGenres(Array.isArray(mg?.genres) ? mg.genres : mg || []);
//         setTVGenres(Array.isArray(tg?.genres) ? tg.genres : tg || []);
//       } catch (e) {
//         console.error("Error loading genres:", e);
//       }
//     })();
//   }, []);

//   const popularMovieGenres =
//     movieGenres.filter(g => POPULAR_MOVIE_NAMES.includes(g.name)).slice(0, 4).length
//       ? movieGenres.filter(g => POPULAR_MOVIE_NAMES.includes(g.name)).slice(0, 4)
//       : movieGenres.slice(0, 4);

//   const popularTVGenres =
//     tvGenres.filter(g => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4).length
//       ? tvGenres.filter(g => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4)
//       : tvGenres.slice(0, 4);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${query}`);
//       setQuery("");
//     }
//   };

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="StarFlix Logo" className="h-10 w-10 object-contain rounded-full" />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       {/* Links + Search */}
//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-red-500 transition duration-200">Home</Link>
//         <Link to="/favorites" className="hover:text-red-500 transition duration-200">Favorites</Link>
//         <Link to="/profile" className="hover:text-red-500 transition duration-200">Profile</Link>

//         {/* 🔎 Compact search bar */}
//         <form onSubmit={handleSearch} className="flex items-center gap-2">
//           <input
//             type="text"
//             value={query}
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             className="px-2 py-1 rounded text-black"
//           />
//           <button type="submit" className="px-2 py-1 bg-red-500 rounded text-white">
//             Go
//           </button>
//         </form>

//         {/* Genres Dropdown */}
//         <div
//           className="relative inline-block"
//           onMouseEnter={() => setIsGenreOpen(true)}
//           onMouseLeave={() => setIsGenreOpen(false)}
//         >
//           <button className="hover:text-red-500 transition duration-200">Genres ▾</button>

//           {isGenreOpen && (
//             <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-2">
//               {/* <Link to="/genre/movie" className="block px-3 py-2 rounded hover:bg-gray-700">All Movie Genres</Link> */}
//               <Link to="/genres" className="block px-3 py-2 rounded hover:bg-gray-700">All Movie Genres</Link>
//               {/* <Link to="/genre/tv" className="block px-3 py-2 rounded hover:bg-gray-700">All TV Genres</Link> */}
//               <Link to="/genres" className="block px-3 py-2 rounded hover:bg-gray-700">All TV Genres</Link>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">Popular Movie Genres</div>
//                 {popularMovieGenres.map((g) => (
//                   // <Link key={g.id} to={`/genre/movie/${g.id}`} className="block px-2 py-1 rounded hover:bg-gray-700 text-sm">{g.name}</Link>
//                   <Link key={g.id} to={`/genres/${g.id}`}   // ✅ updated
//                   className="block px-2 py-1 rounded hover:bg-gray-700 text-sm">{g.name}</Link>
//                 ))}
//               </div>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">Popular TV Genres</div>
//                 {popularTVGenres.map((g) => (
//                   // <Link key={g.id} to={`/genre/tv/${g.id}`} className="block px-2 py-1 rounded hover:bg-gray-700 text-sm">{g.name}</Link>
//                   <Link key={g.id} to={`/genres/${g.id}`}   // ✅ updated
//                   className="block px-2 py-1 rounded hover:bg-gray-700 text-sm">{g.name}</Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { fetchMovieGenres, fetchTVGenres } from "../services/tmdbService";

// const POPULAR_MOVIE_NAMES = ["Action", "Comedy", "Drama", "Thriller"];
// const POPULAR_TV_NAMES = ["Drama", "Comedy", "Action & Adventure", "Animation"];

// const Navbar = () => {
//   const [isGenreOpen, setIsGenreOpen] = useState(false);
//   const [movieGenres, setMovieGenres] = useState([]);
//   const [tvGenres, setTVGenres] = useState([]);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const [mg, tg] = await Promise.all([
//           fetchMovieGenres(),
//           fetchTVGenres(),
//         ]);
//         setMovieGenres(Array.isArray(mg?.genres) ? mg.genres : mg || []);
//         setTVGenres(Array.isArray(tg?.genres) ? tg.genres : tg || []);
//       } catch (e) {
//         console.error("Error loading genres:", e);
//       }
//     })();
//   }, []);

//   const popularMovieGenres =
//     movieGenres.filter((g) => POPULAR_MOVIE_NAMES.includes(g.name)).slice(0, 4)
//       .length
//       ? movieGenres
//           .filter((g) => POPULAR_MOVIE_NAMES.includes(g.name))
//           .slice(0, 4)
//       : movieGenres.slice(0, 4);

//   const popularTVGenres =
//     tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4).length
//       ? tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4)
//       : tvGenres.slice(0, 4);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${query}`);
//       setQuery("");
//     }
//   };

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-3">
//         <img
//           src={logo}
//           alt="StarFlix Logo"
//           className="h-10 w-10 object-contain rounded-full"
//         />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       {/* Links + Search */}
//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-red-500 transition duration-200">
//           Home
//         </Link>
//         <Link
//           to="/favorites"
//           className="hover:text-red-500 transition duration-200"
//         >
//           Favorites
//         </Link>
//         <Link
//           to="/profile"
//           className="hover:text-red-500 transition duration-200"
//         >
//           Profile
//         </Link>

//         {/* 🔎 Compact search bar */}
//         <form onSubmit={handleSearch} className="flex items-center gap-2">
//           <input
//             type="text"
//             value={query}
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             className="px-2 py-1 rounded text-black"
//           />
//           <button
//             type="submit"
//             className="px-2 py-1 bg-red-500 rounded text-white"
//           >
//             Go
//           </button>
//         </form>

//         {/* Genres Dropdown */}
//         <div
//           className="relative inline-block"
//           onMouseEnter={() => setIsGenreOpen(true)}
//           onMouseLeave={() => setIsGenreOpen(false)}
//         >
//           <button className="hover:text-red-500 transition duration-200">
//             Genres ▾
//           </button>

//           {isGenreOpen && (
//             <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-2">
//               <Link
//                 to="/genres"
//                 className="block px-3 py-2 rounded hover:bg-gray-700"
//               >
//                 All Movie Genres
//               </Link>
//               <Link
//                 to="/genres"
//                 className="block px-3 py-2 rounded hover:bg-gray-700"
//               >
//                 All TV Genres
//               </Link>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">
//                   Popular Movie Genres
//                 </div>
//                 {popularMovieGenres.map((g) => (
//                   <Link
//                     key={g.id}
//                     to={`/genres/${g.id}`}
//                     className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
//                   >
//                     {g.name}
//                   </Link>
//                 ))}
//               </div>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">
//                   Popular TV Genres
//                 </div>
//                 {popularTVGenres.map((g) => (
//                   <Link
//                     key={g.id}
//                     to={`/genres/${g.id}`}
//                     className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
//                   >
//                     {g.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 🔑 Auth Links */}
//         <Link
//           to="/login"
//           className="hover:text-red-500 transition duration-200"
//         >
//           Login
//         </Link>
//         <Link
//           to="/register"
//           className="hover:text-red-500 transition duration-200"
//         >
//           Register
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// Navbar.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import { fetchMovieGenres, fetchTVGenres } from "../services/tmdbService";

// const POPULAR_MOVIE_NAMES = ["Action", "Comedy", "Drama", "Thriller"];
// const POPULAR_TV_NAMES = ["Drama", "Comedy", "Action & Adventure", "Animation"];

// const Navbar = () => {
//   const [isGenreOpen, setIsGenreOpen] = useState(false);
//   const [movieGenres, setMovieGenres] = useState([]);
//   const [tvGenres, setTVGenres] = useState([]);
//   const [query, setQuery] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const [mg, tg] = await Promise.all([
//           fetchMovieGenres(),
//           fetchTVGenres(),
//         ]);
//         setMovieGenres(Array.isArray(mg?.genres) ? mg.genres : mg || []);
//         setTVGenres(Array.isArray(tg?.genres) ? tg.genres : tg || []);
//       } catch (e) {
//         console.error("Error loading genres:", e);
//       }
//     })();

//     // keep token state updated
//     const handleStorageChange = () => setToken(localStorage.getItem("token"));
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       navigate(`/search?q=${query}`);
//       setQuery("");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     navigate("/");
//   };

//   const popularMovieGenres =
//     movieGenres.filter((g) => POPULAR_MOVIE_NAMES.includes(g.name)).slice(0, 4)
//       .length
//       ? movieGenres
//           .filter((g) => POPULAR_MOVIE_NAMES.includes(g.name))
//           .slice(0, 4)
//       : movieGenres.slice(0, 4);

//   const popularTVGenres =
//     tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4).length
//       ? tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4)
//       : tvGenres.slice(0, 4);

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-3">
//         <img src={logo} alt="StarFlix Logo" className="h-10 w-10 object-contain rounded-full" />
//         <span className="text-xl font-bold tracking-wider">StarFlix</span>
//       </Link>

//       {/* Links + Search */}
//       <div className="space-x-6 flex items-center">
//         <Link to="/" className="hover:text-red-500 transition duration-200">Home</Link>
//         <Link to="/favorites" className="hover:text-red-500 transition duration-200">Favorites</Link>
//         <Link to="/profile" className="hover:text-red-500 transition duration-200">Profile</Link>

//         {/* 🔎 Search */}
//         <form onSubmit={handleSearch} className="flex items-center gap-2">
//           <input
//             type="text"
//             value={query}
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             className="px-2 py-1 rounded text-black"
//           />
//           <button type="submit" className="px-2 py-1 bg-red-500 rounded text-white">Go</button>
//         </form>

//         {/* 🎬 Genres Dropdown */}
//         <div
//           className="relative inline-block"
//           onMouseEnter={() => setIsGenreOpen(true)}
//           onMouseLeave={() => setIsGenreOpen(false)}
//         >
//           <button className="hover:text-red-500 transition duration-200">
//             Genres ▾
//           </button>

//           {isGenreOpen && (
//             <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-2">
//               <Link
//                 to="/genres"
//                 className="block px-3 py-2 rounded hover:bg-gray-700"
//               >
//                 All Movie Genres
//               </Link>
//               <Link
//                 to="/genres"
//                 className="block px-3 py-2 rounded hover:bg-gray-700"
//               >
//                 All TV Genres
//               </Link>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">
//                   Popular Movie Genres
//                 </div>
//                 {popularMovieGenres.map((g) => (
//                   <Link
//                     key={g.id}
//                     to={`/genres/${g.id}`}
//                     className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
//                   >
//                     {g.name}
//                   </Link>
//                 ))}
//               </div>

//               <div className="my-2 border-t border-white/10" />
//               <div className="px-3 py-2">
//                 <div className="text-xs uppercase opacity-70 mb-1">
//                   Popular TV Genres
//                 </div>
//                 {popularTVGenres.map((g) => (
//                   <Link
//                     key={g.id}
//                     to={`/genres/${g.id}`}
//                     className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
//                   >
//                     {g.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 🔑 Auth Links */}
//         {!token ? (
//           <>
//             <Link to="/login" className="hover:text-red-500 transition duration-200">Login</Link>
//             <Link to="/register" className="hover:text-red-500 transition duration-200">Register</Link>
//           </>
//         ) : (
//           <button onClick={handleLogout} className="hover:text-red-500 transition duration-200">
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { fetchMovieGenres, fetchTVGenres } from "../services/tmdbService";
import { useAuth } from "../context/AuthContext"; // 👈 use AuthContext

const POPULAR_MOVIE_NAMES = ["Action", "Comedy", "Drama", "Thriller"];
const POPULAR_TV_NAMES = ["Drama", "Comedy", "Action & Adventure", "Animation"];

const Navbar = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 👇 Auth state from context (no more manual localStorage checks!)
  const { user, token, logout } = useAuth();
  console.log("🔑 Navbar sees token:", token, "user:", user);

  useEffect(() => {
    (async () => {
      try {
        const [mg, tg] = await Promise.all([
          fetchMovieGenres(),
          fetchTVGenres(),
        ]);
        setMovieGenres(Array.isArray(mg?.genres) ? mg.genres : mg || []);
        setTVGenres(Array.isArray(tg?.genres) ? tg.genres : tg || []);
      } catch (e) {
        console.error("Error loading genres:", e);
      }
    })();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  const handleLogout = () => {
    logout(); // 👈 from AuthContext
    navigate("/");
  };

  const popularMovieGenres =
    movieGenres.filter((g) => POPULAR_MOVIE_NAMES.includes(g.name)).slice(0, 4)
      .length
      ? movieGenres
          .filter((g) => POPULAR_MOVIE_NAMES.includes(g.name))
          .slice(0, 4)
      : movieGenres.slice(0, 4);

  const popularTVGenres =
    tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4).length
      ? tvGenres.filter((g) => POPULAR_TV_NAMES.includes(g.name)).slice(0, 4)
      : tvGenres.slice(0, 4);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg relative">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="StarFlix Logo"
          className="h-10 w-10 object-contain rounded-full"
        />
        <span className="text-xl font-bold tracking-wider">StarFlix</span>
      </Link>

      {/* Links + Search */}
      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className="hover:text-red-500 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className="hover:text-red-500 transition duration-200"
        >
          Favorites
        </Link>
        <Link
          to="/profile"
          className="hover:text-red-500 transition duration-200"
        >
          Profile
        </Link>

        {/* 🔎 Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            className="px-2 py-1 rounded text-black"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-red-500 rounded text-white"
          >
            Go
          </button>
        </form>

        {/* 🎬 Genres Dropdown */}
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsGenreOpen(true)}
          onMouseLeave={() => setIsGenreOpen(false)}
        >
          <button className="hover:text-red-500 transition duration-200">
            Genres ▾
          </button>

          {isGenreOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-50 p-2">
              <Link
                to="/genres"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                All Movie Genres
              </Link>
              <Link
                to="/genres"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                All TV Genres
              </Link>

              <div className="my-2 border-t border-white/10" />
              <div className="px-3 py-2">
                <div className="text-xs uppercase opacity-70 mb-1">
                  Popular Movie Genres
                </div>
                {popularMovieGenres.map((g) => (
                  <Link
                    key={g.id}
                    to={`/genres/${g.id}`}
                    className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>

              <div className="my-2 border-t border-white/10" />
              <div className="px-3 py-2">
                <div className="text-xs uppercase opacity-70 mb-1">
                  Popular TV Genres
                </div>
                {popularTVGenres.map((g) => (
                  <Link
                    key={g.id}
                    to={`/genres/${g.id}`}
                    className="block px-2 py-1 rounded hover:bg-gray-700 text-sm"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🔑 Auth Links */}
        {!token ? (
          <>
            <Link
              to="/login"
              className="hover:text-red-500 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-red-500 transition duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


