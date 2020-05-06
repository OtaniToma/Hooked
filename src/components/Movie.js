import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = "http://via.placeholder.com/200x300";

const Movie = ({ movie }) => {
  
  // ポスター画像が含まれていない場合はデフォルトの画像を返す
  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};

export default Movie;