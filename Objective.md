🎬 StarFlix Frontend
📖 Overview 

The StarFlix Frontend is a modern React application built with Vite that serves as the user interface for the StarFlix movie recommendation platform.
It connects with the backend API (authentication, favorites, watchlist) and the TMDB API (movies, TV shows, genres, search, and images).
This is the frontend of the Movie Recommendation Application, built with React (Vite) and styled using Tailwind CSS. It integrates with a custom Node.js backend and The Movie Database (TMDB) API to provide movie and TV show browsing, recommendations, and personalized user experiences.


Users can:

🔑 Register, login, and manage profiles.

🎥 Browse popular movies and TV shows.

🔎 Search for titles and view detailed information.

❤️ Add/remove favorites.

📺 Manage a watchlist.

🎬 Explore genres and cast/crew details.

⚙️ Tech Stack

React (Vite) – Frontend framework

React Router – Client-side routing

Tailwind CSS – Styling and responsive UI

Context API (AuthContext) – Authentication state management

Custom Hooks – Favorites & Watchlist management

Axios – API requests

TMDB API – Movie and TV data


🧩 Frontend Module Overview
🔐 Authentication & Context

Login and Register pages for user access.

AuthContext provides global state for authentication and user data.

Protected routes using PrivateRoute.


🏠 Core Pages

Home: Displays hero banner, popular/trending movies, and TV sections.

MovieDetails / TVDetails: Detailed info, images, credits, reviews, and related content.

SearchResults: Displays search results for movies or TV shows.

GenrePage: Browse movies/TV shows filtered by genre.

Favorites / Watchlist: Personalized collections for logged-in users.

Profile: View and save personal profile information.

PersonDetails: Info about actors/crew.

Login / Register: Authentication entry points.

NotFound: 404 fallback page.


🎨 Components

Navbar: Navigation with dynamic login/logout links (uses AuthContext).

HeroBanner: Displays a featured TMDB movie or fallback banners.

MovieCard / TVShowCard: Reusable components for movie/TV displays.

MovieList / TVShowList: Sectioned displays for popular, trending, etc.

MovieCredits / MovieImages: Additional details for MovieDetails/TVDetails.

Reviews: User reviews section for movies.

Watchlist: Displays saved watchlist items.

PrivateRoute: Guards protected routes (favorites, profile, etc.).


🛠️ Hooks

useFavorites: Custom hook to manage favorites (add/remove).

useWatchlist: Custom hook to manage watchlist.


🌐 Services (API Layer)

api.js: Centralized axios instance.

axiosConfig.js: Handles base URL and headers.

authService.js: Manages authentication requests.

favoriteService.js: Handles favorites API requests.

watchlistService.js: Handles watchlist API requests.

tmdbService.js: Fetches data from TMDB (movies, TV, genres, etc.).



✨ Features

🔑 Authentication

Register / Login with JWT (backend integrated).

Persisted login using localStorage

Logout and profile management

Global auth state stored in context.

Protected routes for user-only features.

🎥 Movies & TV Shows

Browse popular movies & TV shows

View movie/TV details, trailers, credits, reviews, and images

Explore genres and trending titles

Person (actor/crew) details

🎞️ Movies

Display popular, trending, and top-rated movies.

Search for movies.

View movie details, images, and credits.

Add/remove favorites and watchlist.

Read and submit reviews.

📺 TV Shows

Browse popular, trending, and currently airing TV shows.

View TV show details, images, and credits.

Add/remove from favorites and watchlist.

🎭 Genres

Browse by genre (movies & TV).

Dynamic TMDB genre fetching.

❤️ Favorites

Add/remove movies and TV shows to favorites

Favorites page with persistent storage

📺 Watchlist

Add/remove watchlist items

Custom hook (useWatchlist) for management

👤 User Profile

Save and view profile details.

Profile persistence with backend integration.

👤 User Features

- Profile Management

Save profile data (name, email).

Future extension: Update/edit profile info.

- Favorites

Add/remove favorites from any movie/TV show detail or card.

Favorites page to view saved titles.

- Watchlist

Add/remove movies and TV shows.

Watchlist page to manage them.

- Search

Search movies or TV shows by keyword.

Results shown in SearchResults page.

- Movies & TV Shows

Browse trending, popular, top-rated, and genre-based categories.

Access details: description, cast, crew, images, reviews, and videos.

- Reviews

Add, view, and delete reviews.

User-specific review control.

🎨 UI/UX

Responsive design with Tailwind CSS.

Fallback banners for hero section.

Error handling for failed API calls.

HeroBanner with TMDB or fallback local banners.

Default images (e.g., default.jpg) for missing posters.

Protected routes for authenticated-only pages.

404 NotFound page.

🎬 UI Features

HeroBanner with TMDB data and fallback images

Responsive Navbar with dropdowns and search

Protected routes with PrivateRoute

404 NotFound page

Tailwind styling (dark theme + responsive layout)

🔧 Services

api.js → Handles API base setup

axiosConfig.js → Axios instance with interceptors

authService.js → Login, register, logout

tmdbService.js → Fetch TMDB data (movies, TV, genres, search)

favoriteService.js → Favorite management (connects to backend)

watchlistService.js → Watchlist management (connects to backend)

🌍 Deployment

Deployment will be done on Vercel:

Build Command: npm run build

Output Directory: dist

Environment Variables: Same as .env

After deployment, update README with:

⚙️ Backend (Render): https://movie-recommendation-app-backend-4ghi.onrender.com

🌐 Frontend (Vercel): https://starflix-beta.vercel.app


📂 Folder Structure
frontend/
├── public/              # Public assets (favicon, logos, fallback banners) 
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   ├── index.css
│   │
│   ├── assets/         # Images (banners, logos, default images) / # Static assets
│   │   ├── logo.png
│   │   ├── favicon.ico
│   │   ├── banners/
│   │   │   ├── background_banner.jpg
│   │   │   ├── banner1.jpg
│   │   │   ├── banner2.jpg
│   │   │   └── banner3.jpg (if available)
│   │   ├── defaults/
│   │   │   ├── default.jpg
│   │   │   └── other fallback assets
│   │
│   ├── components/        # Reusable UI components
│   │   ├── HeroBanner.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieCredits.jsx
│   │   ├── MovieImages.jsx
│   │   ├── MovieList.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── Reviews.jsx
│   │   ├── TVShowCard.jsx
│   │   ├── TVShowList.jsx
│   │   └── Watchlist.jsx
│   │
│   ├── context/          # AuthContext provider
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/            # Custom React hooks
│   │   ├── useFavorites.js
│   │   └── useWatchlist.js
│   │
│   ├── pages/            # Main pages
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── SearchResults.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── TVDetails.jsx
│   │   ├── GenrePage.jsx
│   │   ├── PersonDetails.jsx
│   │   ├── Favorites.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/       # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── axiosConfig.js
│   │   ├── favoriteService.js
│   │   ├── tmdbService.js
│   │   └── watchlistService.js
│   ├── App.jsx         # Main app component
    ├── routes.jsx      # Route definitions
    ├── main.jsx        # React entry point
    ├── index.css       # Tailwind + global styles
    ├── index.html      # HTML entry

└── README.md           # Project documentation
└── package.json


🚀 Setup Instructions
Once done with the backend, then move to the frontend
For easier followup, I see it that you are meant to start the buildup of the app of this frontend in particular 
from installing dependencies
to .env (it needs VITE_TMDB_API_KEY and VITE_TMDB_BASE_URL)
to services (api needs module - axios, tmdbService needs api)
to assets (images- banners, default, and logo) and favicon image
to components (HeroBanner needs banners, and fetchPopularMovies from tmdbService in services. MovieCard needs default. MovieList needs MovieCard. MovieCredits needs default. MovieImages needs nothing. Navbar needs both Link and useNavigate from module- react-router-dom, both fetchMovieGenres and fetchTVGenres from tmdbService in services, logo. Reviews needs nothing. TVShowCard needs Link from module- react-router-dom. TVShowList needs TVShowCard. Watchlist needs MovieList, api from services)
to pages (Favorites needs MovieList from components, api from services. Profile needs Link from module - react-router-dom, Watchlist from components. GenrePage needs both Link and useParams from module - react-router-dom, both MovieList and TVShowList from components, and fetchMovieGenres, fetchTVGenres, fetchMoviesByGenre, and fetchTVShowsByGenre from tmdbService. Home needs HeroBanner, MovieList, and TVShowList from components, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, fetchNowPlayingMovies, fetchTrendingMovies, fetchPopularTVShows, fetchTopRatedTVShows, and fetchOnTheAirTVShows from tmdbService. MovieDetails needs useParams from module - react-router-dom, default from assets, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews, fetchMovieRecommendations, fetchMovieImages, fetchMovieVideos, and fetchSimilarMovies from tmdbService, Reviews, MovieCredits, MovieImages, and MovieList from components. PersonDetails needs both useParams and Link from module - react-router-dom, fetchPersonDetails, fetchPersonMovies, and fetchPersonCredits from tmdbService, and MovieList and TVShowList from components. SearchResults needs both useSearchParams and useNavigate from module - react-router-dom, both MovieList and TVShowList from components, and both searchMovies and searchTVShows from tmdbService. TVDetails needs  useParams from module - react-router-dom, default from assets, both MovieCredits and TVShowList from components, and  fetchTVShowDetails, fetchTVShowCredits, fetchSimilarTVShows, fetchTVSeasonDetails, and fetchTVEpisodeDetails from tmdbService in services. NotFound needs Link from react-router-dom.)
to routes (it needs 9 pages)
back to .env by adding to existing ones (it needs VITE_TMDB_API_KEY, VITE_TMDB_BASE_URL, and VITE_BACKEND_URL)
back to services by adding to existing ones (api needs module - axios, tmdbService needs api, axiosConfig needs module - axios, authService needs backendApi from axiosConfig, favoriteService needs backendApi from axiosConfig, and watchlistService needs backendApi from axiosConfig)
to hooks (useFavorites needs getFavorites, addFavorite, and removeFavorite from favoriteService in services. useWatchlist needs getWatchlist, addToWatchlist, removeFromWatchlist from watchlistService in services)
to context (AuthContext needs createContext, useContext, useState, and useEffect from react)
back to components by adding to existing ones (MovieCard needs default, and both useFavorites and useWatchlist from hooks. Navbar needs both Link and useNavigate from module- react-router-dom, both fetchMovieGenres and fetchTVGenres from tmdbService in services, logo, and useAuth from AuthContext in context. PrivateRoute needs Navigate from module- react-router-dom. Watchlist needs MovieList, api from services, and useWatchlist from hooks.)
back to pages by adding to existing ones (Favorites needs MovieList, api from services, and useFavorites from hooks. Profile needs Link from module - react-router-dom, Watchlist from components, backendApi from axiosConfig in services, and logoutUser from authService in services. Login needs both useNavigate and Link from module - react-router-dom, loginUser from authService in services, and useAuth from AuthContext in context. Register needs both useNavigate and Link from module - react-router-dom, registerUser from authService in services, and useAuth from AuthContext in context)
back to routes by adding to existing ones (it needs all 11 pages, and privateRoute from components)
to app.jsx (it needs BrowserRouter as Router, Routes, and Route from module - react-router-dom, Navbar from components, and routes)
to main.jsx (it needs ReactDOM from module- react-dom/client, AuthProvider from AuthContext in context, app.jsx, and index.css)
to index.html
to README
to deploying / deployment configuration.


1️⃣ Clone Repository
git clone https://github.com/your-username/starflix-frontend.git
cd starflix-frontend

- Initialize Vite + React Project
npm create vite@latest frontend -- --template react
frontend is the name of your project folder. You can change it as needed.

This will scaffold a Vite + React app.
Then: cd frontend in the terminal

2️⃣ Install Dependencies
npm install
Dependencies include: react, react-router-dom, axios, postcss.config.js, tailwindcss (specifically npm install -D tailwindcss@3.4.1 or any other working version), framer-motion

- To install and use Tailwind CSS, you have to
✅ Install Tailwind CSS + Dependencies

Run:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


This creates two files:

tailwind.config.js

postcss.config.js

✅ Configure Tailwind

In your tailwind.config.js, update the content array to include:

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],


This tells Tailwind where to look for class names.

✅ Add Tailwind Directives

In src/index.css, replace all contents with:

@tailwind base;
@tailwind components;
@tailwind utilities;


3️⃣ Configure Environment Variables

Create a .env file in the project root with:

VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_BACKEND_URL=https://your-backend.onrender.com


VITE_TMDB_API_KEY: Your TMDB API key.

VITE_BACKEND_URL: The deployed backend API (from Render/Heroku).

4️⃣ Run Development Server
npm run dev

App runs at: http://localhost:5173



Other things to note
There is the windows and linux differentiation. You can be running your code using linux Unix, windows powershell, or linux extension on windows. For example in frontend, the PowerShell Equivalent to rm -rf node_modules package-lock.json (which is for deleting both the node_modules folder and the package-lock.json file, just like rm -rf on Unix/macOS.) on unix is Remove-Item -Recurse -Force node_modules, package-lock.json.

In package.json, in the metadata block, setting type as module (which is ESM projects standard) is if you want to adopt "export default" / "import", while not setting it (which is common JS tools) by removing it, not commenting it out is if you want to adopt "module.exports". In addition, if you remove it and you are adopting tailwind css, you have to make modify your tailwind.config.js file.

Also, in package.json, adopting "lint": "eslint . --ext .js,.jsx" instead of "lint": "eslint ." tells ESLint to scan both .js and .jsx files in the src folder (or wherever you point it), and it ensures consistent linting across all your JavaScript and React component files as the latter makes ESLint usually default to linting only .js files (depending on your config).

There is also the problem of "You’re writing JSX inside a .js file (e.g., routes.js) but Vite is not treating it as JSX. You can fix this in 2 possible ways (pick ONE): 
Option 1: Rename routes.js ➜ routes.jsx

Option 2: Configure .js files to be treated as JSX
If you really want to keep the filename as .js, then tell Vite to treat .js files as JSX by editing vite.config.js:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // ← this treats all `.js` as `.jsx`
    include: /src\/.*\.js$/, // only affect your source files
  },
});

Then re-run: npm run dev
⚠️ Note: Option 1 is preferred for clarity and convention (keep .jsx files named correctly). Option 2 is good if you want to be flexible or are dealing with legacy structure.


Both your frontend and backend must run simultaneously during the phase of connection of frontend to backend. 
It should also be noted that you are to deploy your backend first before your frontend.



🔌 Key Routes Overview
Page	          Route	          Description	            Auth Required
Home	            /	      Homepage with hero + sections	    ❌
Login	          /login	        User login	                ❌
Register	      /register	      User registration	          ❌
Profile	        /profile	      View/edit profile	          ✅
Favorites	      /favorites  User’s favorite movies & shows	✅
Watchlist	      /watchlist	User’s saved watchlist	        ✅
Genre Page	    /genre/:id	    Browse by genre	            ❌
Search Results	/search/:query	Search movies/TV	          ❌
Movie Details	  /movie/:id	    Movie detail page	          ❌
TV Details	    /tv/:id	        TV show detail page	        ❌
Person Details	/person/:id	     Actor/crew details	        ❌
NotFound	          *	            Catch-all 404 page	      ❌



🔌 Integration with Backend

All auth, favorites, watchlist, reviews, and profile features use the backend API.

Movies, TV shows, genres, and search are powered by TMDB API.

Axios interceptors automatically attach JWT tokens to authenticated requests.


🛠️ Notes & Design

Routing: All routes defined in routes.jsx, powered by React Router.

State Management: Context API (AuthContext) + localStorage persistence.

Custom Hooks: Abstract favorites and watchlist logic for reusability.

Fallback Assets: Default banners and images ensure graceful UI degradation offline or on missing TMDB data.


🛠️ Future Enhancements (Optional)

⭐ Rating system for movies/TV shows

📝 User reviews with comments

📊 Dashboard with watch history

🎨 Skeleton loaders for better UX / UI polish: skeleton loaders, error boundaries / UI polish (loading states, skeleton screens).

🌙 Theme toggle (light/dark mode)

Offline fallback pages (local banners + cached movie/TV lists) / Updateable profile (edit/change info).

Profile editing & validation messages (e.g., "Profile already exists").

Add “Add to favorites/watchlist” for TV shows (currently only for movies).

TV shows parity (favorites, watchlist, reviews for TV as for movies).

Offline fallback for banners and cached sections.



📩 Contact

For questions or contributions, contact:
Oluwafemi Ajao
📧 Starrylive007@gmail.com

🔗 LinkedIn
