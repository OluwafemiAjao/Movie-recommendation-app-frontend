import React from "react";
import TVShowCard from "./TVShowCard";

const TVShowList = ({ title, tvShows = [] }) => {
  if (!tvShows || tvShows.length === 0) return null;

  return (
    <div className="my-8">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {tvShows.map((show) => (
          <TVShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default TVShowList;
