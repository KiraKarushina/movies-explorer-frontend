import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

function MovieCard({
  onSavedPage,
  savedMovies,
  onSaveHandler,
  onDeleteHandler,
  ...props
}) {
  const hours = Math.floor(props.duration / 60);
  const minutes = props.duration % 60;
  const location = useLocation();
  const onRouteSavedMovies = location.pathname === "/saved-movies";

  const serverUrl = "https://api.nomoreparties.co/";
  const [isSaved, setIsSaved] = useState(false);

  const buttonClassName = useMemo(() => {
    return (
      (isSaved && !onRouteSavedMovies && "card__favorite_active") ||
      (onRouteSavedMovies && "card__favorite_delete")
    );
  }, [isSaved, onRouteSavedMovies]);

  const handleSave = () => {
    // создаем объект фильма для сохранения
    // добавляем дефолтные значения
    const movieData = {
      country: props.country || "",
      director: props.director || "",
      duration: props.duration,
      year: props.year || "",
      description: props.description || "",
      image: serverUrl + props.image.url || "",
      trailerLink: props.trailerLink || "",
      nameRU: props.nameRU || props.nameEN || "",
      nameEN: props.nameEN || props.nameRU || "",
      thumbnail: serverUrl + props.image.formats.thumbnail.url || "",
      movieId: props.id,
    };
    onSaveHandler(movieData, setIsSaved);
  };

  const handleDelete = () => {
    onDeleteHandler(props._id || props.id, setIsSaved);
  };

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  return (
    <div className="card">
      <a
        href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
        className="card__trailer-link"
      >
        <img
          className="card__image"
          src={props.image?.url ? serverUrl + props.image.url : props.image}
          alt={props.nameRU}
        />
      </a>
      <div className="card__footer">
        <div className="card__description">
          <h3 className="card__title text_subtitle">{props.nameRU}</h3>
          <button
            className={`card__favorite ${buttonClassName}`}
            onClick={
              onSavedPage ? handleDelete : isSaved ? handleDelete : handleSave
            }
          ></button>
        </div>
        <p className="card__duration text text_color">{`${
          hours === 0 ? "" : hours + "ч"
        } ${minutes}м`}</p>
      </div>
    </div>
  );
}

export default MovieCard;
