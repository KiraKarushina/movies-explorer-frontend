import { useState, useEffect, useCallback } from "react";
import {
  bigMooviesCount,
  middleMooviesCount,
  shortDurMoovieMin,
  smallMooviesCount,
  sw480,
  sw768,
  threeMovieInColumn,
  twoMovieInColumn,
} from "../../utils/constants";
import MovieCard from "../MovieCard/MovieCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  handleClickMoreMovies,
  showedCountMovies,
  isNotFound,
  isFilteredShortFilms,
}) {
  const [moviesList, setMoviesList] = useState(movies);

  //Получаем размер экрана для отображения количества фильмов и кнопки еще
  const [width, setWidth] = useState(window.innerWidth);

  const [loading, setLoading] = useState(false);

  const [countShowMore, setCountShowMore] = useState(threeMovieInColumn);

  const updateWidth = useCallback(() => {
    setWidth(window.innerWidth);
    if (width <= sw480) {
      setCountShowMore(twoMovieInColumn);
      return smallMooviesCount;
    }
    if (width <= sw768) {
      setCountShowMore(twoMovieInColumn);
      return middleMooviesCount;
    } else {
      setCountShowMore(threeMovieInColumn);
      return bigMooviesCount;
    }
  }, [width]);

  const filteredMovies = useCallback(() => {
    return movies.filter((movie) => movie.duration <= shortDurMoovieMin);
  }, [movies]);

  useEffect(() => {
    if (movies.length && isFilteredShortFilms) {
      setMoviesList(filteredMovies());
    }
  }, [isFilteredShortFilms, filteredMovies, movies]);

  //Добавляем  и удалям прослушку на изменение размера экрана
  useEffect(() => {
    setTimeout(() => {
      if (!showedCountMovies) {
        handleClickMoreMovies(updateWidth());
      }
      window.addEventListener("resize", updateWidth);
    }, 100);
    return () => window.removeEventListener("resize", updateWidth);
  }, [showedCountMovies, handleClickMoreMovies, updateWidth]);

  useEffect(() => {
    if (movies.length && isFilteredShortFilms) {
      if (filteredMovies().length === 0) {
        isNotFound();
      }
    } else {
      setMoviesList(movies);
    }
  }, [
    isFilteredShortFilms,
    filteredMovies,
    isNotFound,
    movies,
    movies.length,
    moviesList.length,
    setMoviesList,
  ]);

  function handleClick() {
    handleClickMoreMovies(countShowMore);
  }

  return (
    <div className="cards">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <p className="cards__message text_subtitle"></p>
          <div className="cards__list">
            {moviesList.slice(0, showedCountMovies).map((movie) => (
              <MovieCard movie={movie} key={movie.id || movie._id} />
            ))}
          </div>

          {showedCountMovies < moviesList.length && (
            <button className="cards__button text link" onClick={handleClick}>
              Ещё
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
