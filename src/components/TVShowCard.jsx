import React from "react";
import { Link } from "react-router-dom";

const TVShowCard = ({ show }) => {
  return (
    <Link to={`/tv/${show.id}`} className="block bg-gray-900 rounded-lg shadow hover:shadow-lg transition">
      <img
        src={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "/default.jpg"
        }
        alt={show.name}
        className="w-full h-72 object-cover rounded-t-lg"
      />
      <div className="p-2">
        <h3 className="text-sm font-medium text-white truncate">{show.name}</h3>
        <p className="text-xs text-gray-400">
          ⭐ {show.vote_average ? show.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default TVShowCard;
