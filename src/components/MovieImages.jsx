// src/components/MovieImages.jsx
import React from "react";

const MovieImages = ({ images }) => {
  if (!images || (!images.backdrops?.length && !images.posters?.length)) {
    return <p className="text-gray-400">No images available.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Images</h2>

      {/* Backdrops */}
      {images.backdrops?.length > 0 && (
        <>
          <h3 className="text-xl font-medium mb-2">Backdrops</h3>
          <div className="flex overflow-x-scroll space-x-4 pb-2">
            {images.backdrops.slice(0, 10).map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                alt={`Backdrop ${index + 1}`}
                className="rounded-lg shadow-md h-40"
              />
            ))}
          </div>
        </>
      )}

      {/* Posters */}
      {images.posters?.length > 0 && (
        <>
          <h3 className="text-xl font-medium mt-6 mb-2">Posters</h3>
          <div className="flex overflow-x-scroll space-x-4 pb-2">
            {images.posters.slice(0, 10).map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt={`Poster ${index + 1}`}
                className="rounded-lg shadow-md h-64"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieImages;
