import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utils/MainApi";

function MovieCard({ movie }) {
  const imageUrl = 'https://api.nomoreparties.co/' + movie.image.url
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const [isMovieSaved, setIsMovieSaved] = useState();
  const location = useLocation();
  const onRouteSavedMovies = location.pathname === "/saved-movies";

  const buttonClassName =
    (isMovieSaved && !onRouteSavedMovies && "card__favorite_active") ||
    (onRouteSavedMovies && "card__favorite_delete");

  function handleClickFavorite() {
    if (onRouteSavedMovies || isMovieSaved) {
      api.deleteMovie(isMovieSaved._id);
    } else {
      api.saveMovie(movie);
    }
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h3 className="card__title text_subtitle">{movie.nameRU}</h3>
          <p className="card__duration text color_text">{`${
            hours === 0 ? "" : hours + "ч"
          } ${minutes}м`}</p>
        </div>
        <button
          className={`card__favorite color_secondary link ${buttonClassName}`}
          onClick={handleClickFavorite}
        ></button>
      </div>
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card__trailer-link"
      >
        <img className="card__image" src={imageUrl} alt={movie.nameRU} />
      </a>
    </div>
  );
}

export default MovieCard;
