// import Home from "../pages/Home";
// import MovieDetails from "../pages/MovieDetails";
// import SearchResults from "../pages/SearchResults";
// import NotFound from "../pages/NotFound";
// import Favorites from "../pages/Favorites";
// import Profile from "../pages/Profile"; // ✅ New import

// const routes = [
//   { path: "/", element: <Home /> },
//   { path: "/movie/:id", element: <MovieDetails /> },
//   { path: "/search", element: <SearchResults /> },
//   { path: "/favorites", element: <Favorites /> },
//   { path: "/profile", element: <Profile /> }, // ✅ New route
//   { path: "*", element: <NotFound /> }
// ];

// export default routes;





// import Home from "../pages/Home";
// import MovieDetails from "../pages/MovieDetails";
// import TVDetails from "../pages/TVDetails"; // ✅ Make sure this is already implemented
// import SearchResults from "../pages/SearchResults";
// import PersonDetails from "../pages/PersonDetails"; // ✅ New import
// import GenrePage from "../pages/GenrePage"; // ✅ New import
// import Favorites from "../pages/Favorites";
// import Profile from "../pages/Profile";
// import NotFound from "../pages/NotFound";

// const routes = [
//   { path: "/", element: <Home /> },
//   { path: "/movie/:id", element: <MovieDetails /> },
//   { path: "/tv/:id", element: <TVDetails /> }, // ✅ Added TV show details route
//   { path: "/search", element: <SearchResults /> },
//   { path: "/person/:id", element: <PersonDetails /> }, // ✅ Added person details route
//   { path: "/genres", element: <GenrePage /> }, // directory (lists all genres)
//   { path: "/genres/:id", element: <GenrePage /> }, // detail (renders titles)
//   // {  path: "/genre/:type", element: <GenrePage />,}, 
//   // {  path: "/genre/:type/:id", element: <GenrePage />,},
//   // {/* :type will be "movie" or "tv" so we can reuse one component for both ✅ */}
//   { path: "/favorites", element: <Favorites /> },
//   { path: "/profile", element: <Profile /> },
//   { path: "*", element: <NotFound /> },
// ];

// export default routes;





// import React from "react";
// import { Navigate } from "react-router-dom";
// import Home from "../pages/Home";
// import MovieDetails from "../pages/MovieDetails";
// import TVDetails from "../pages/TVDetails";
// import SearchResults from "../pages/SearchResults";
// import PersonDetails from "../pages/PersonDetails";
// import GenrePage from "../pages/GenrePage";
// import Favorites from "../pages/Favorites";
// import Profile from "../pages/Profile";
// import NotFound from "../pages/NotFound";
// import PrivateRoute from "../components/PrivateRoute";

// const routes = [
//   { path: "/", element: <Home /> },
//   { path: "/movie/:id", element: <MovieDetails /> },
//   { path: "/tv/:id", element: <TVDetails /> },
//   { path: "/search", element: <SearchResults /> },
//   { path: "/person/:id", element: <PersonDetails /> },
//   { path: "/genres", element: <GenrePage /> },
//   { path: "/genres/:id", element: <GenrePage /> },
//   { path: "/favorites", element: <PrivateRoute><Favorites /></PrivateRoute> },
//   { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
//   { path: "*", element: <NotFound /> },
// ];

// export default routes;




import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import TVDetails from "../pages/TVDetails";
import SearchResults from "../pages/SearchResults";
import PersonDetails from "../pages/PersonDetails";
import GenrePage from "../pages/GenrePage";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/movie/:id", element: <MovieDetails /> },
  { path: "/tv/:id", element: <TVDetails /> },
  { path: "/search", element: <SearchResults /> },
  { path: "/person/:id", element: <PersonDetails /> },
  { path: "/genres", element: <GenrePage /> },
  { path: "/genres/:id", element: <GenrePage /> },
  { path: "/favorites", element: <PrivateRoute><Favorites /></PrivateRoute> },
  { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
