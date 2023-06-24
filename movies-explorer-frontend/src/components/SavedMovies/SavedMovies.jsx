import { useState, useEffect } from "react";
import { NOTHING_FOUND, SHORT_DUR_MOOVIE_MIN } from "../../utils/constants";
import api from "../../utils/MainApi";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  savedMovies,
  setSavedMovies,
  message,
  cardErrorHandler,
}) {

  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState(savedMovies);
  const [resultMessage, setResultMessage] = useState("");
  const token = localStorage.getItem("token");

  const filterMovies = (searchQuery, moviesArray) => {
    return moviesArray.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const findOnlyShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration < SHORT_DUR_MOOVIE_MIN);
  };

  useEffect(() => setMoviesForRender(savedMovies), [savedMovies]);

  useEffect(() => {
    if (message) {
      setResultMessage(message);
    }
  }, [message]);

  const deleteMovie = (movieId, likeHandler) => {
    api
      .deleteMovie(movieId, token)
      .then(() => {
        likeHandler(false);
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        setMoviesForRender((state) => state.filter((m) => m._id !== movieId));
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const submitHandler = (isOnlyShortFilms, searchQuery) => {

    const filteredMovies = filterMovies(searchQuery, savedMovies);
    const filteredShortMovies = findOnlyShortMovies(filteredMovies);


    if (isOnlyShortFilms) {
      setMoviesForRender(filteredShortMovies);
      if (filteredShortMovies.length === 0 && !message) {
        setResultMessage(NOTHING_FOUND);
      }
    } else {
      setMoviesForRender(filteredMovies);
      if (filteredMovies.length === 0 && !message) {
        setResultMessage(NOTHING_FOUND);
      }
    }
  };

  return (
    <HeadAndFoodWrapper>
      <main className="movies">
        <SearchForm
          submitHandler={submitHandler}
          checkbox={shortFilmsCheck}
          setCheckbox={setShortFilmsCheck}
        />
        {moviesForRender && !message && (
          <MoviesCardList
            allMovies={moviesForRender}
            onDeleteHandler={deleteMovie}
            onSavedPage={true}
          />
        )}
        <p className="movies__message">{resultMessage}</p>
      </main>
    </HeadAndFoodWrapper>
  );
}

export default SavedMovies;
