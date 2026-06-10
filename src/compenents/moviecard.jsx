import React from "react";

function Moviecard({
  movie: {
    title,
    vote_average,
    release_date,
    overview,
    poster_path,
    original_language,
  },
}) {
  return (
    <div className="movie-card">
      {/* Poster */}
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />

      {/* Title */}
      <h3>{title}</h3>

      {/* Content row */}
      <div className="content">
        <div className="rating">
          <img src="/star.svg" alt="star" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>

        <span>•</span>

        <p className="lang">{original_language}</p>

        <span>•</span>

        <p className="year">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
        <p className="text-white">{overview ? overview : "No overview available."}</p>
      </div>
    </div>
  );
}

export default Moviecard;
