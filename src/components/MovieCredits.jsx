// src/components/MovieCredits.jsx
import React from "react";
import defaultPoster from "../assets/default.png";

const MovieCredits = ({ credits }) => {
  if (!credits || !credits.cast || credits.cast.length === 0) {
    return <p className="text-gray-400">No cast information available.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {credits.cast.slice(0, 12).map((actor) => (
          <div key={actor.cast_id || actor.credit_id} className="text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : defaultPoster
              }
              alt={actor.name}
              className="rounded-lg shadow-md mx-auto"
            />
            <p className="mt-2 font-medium text-sm">{actor.name}</p>
            <p className="text-gray-400 text-xs">as {actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCredits;
