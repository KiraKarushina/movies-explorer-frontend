import { useEffect, useState } from "react";
import api from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import {
  bigMooviesCount,
  middleMooviesCount,
  smallMooviesCount,
  sw480,
  sw768,
  sw1280,
  fourMovieInColumn,
  twoMovieInColumn,
  oneMoovieInColumn,
  shortDurMoovieMin,
  default_err_message,
  nothing_found,
} from "../../utils/constants";
import { useGetWidthWindow } from "../../hooks/useGetWidthWindow";
import { beatFilmApi } from "../../utils/MooviesApi";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";

function Movies({ savedMovies, setSavedMovies, cardErrorHandler }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsAmount, setInitialCards] = useState(0);
  const [cardsPage, setCardsPage] = useState(0);
  const [cardsInBundle, setCardsInBundle] = useState(0);
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const cardsCount = initialCardsAmount + cardsInBundle * cardsPage;
  const width = useGetWidthWindow();
  const localStorageData = localStorage.getItem("queryData");
  const token = localStorage.getItem("token");
  let allMovies = localStorage.getItem("allMoviesData");

  let filteredMovies = JSON.parse(localStorageData)?.filteredMovies || [];
  let filteredShortMovies =
    JSON.parse(localStorageData)?.filteredShortMovies || [];

  const filterMovies = (searchQuery, moviesArray) => {
    return moviesArray.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const findOnlyShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration < shortDurMoovieMin);
  };

  const getOneIdByAnother = (id, array) => {
    const searchItem = array.find((movie) => movie.movieId === id);
    return searchItem._id;
  };

  const removeAllMoviesData = () => localStorage.removeItem("allMoviesData");

  const submitHandler = async (isOnlyShortFilms, searchQuery) => {
    try {
      setIsLoading(true);
      setResultMessage("");

      if (!allMovies) {
        const allMoviesData = await beatFilmApi.getMovies();
        localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
        allMovies = localStorage.getItem("allMoviesData");
      }

      filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
      filteredShortMovies = findOnlyShortMovies(filteredMovies);

      const queryData = {
        filteredMovies,
        filteredShortMovies,
        searchQuery,
        isOnlyShortFilms,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));

      if (isOnlyShortFilms) {
        setMovies(filteredShortMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage(nothing_found);
        }
      } else {
        setMovies(filteredMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage(nothing_found);
        }
      }

      setErrorMessage("");
      setIsLoading(false);
    } catch (e) {
      setMovies([]);
      setErrorMessage(default_err_message);
      console.log(e);
      setIsLoading(false);
    }
  };

  const moreButtonHandler = () => setCardsPage((prev) => prev + 1);

  const MoreButton = ({ displayed }) => (
    <button
      className={`button_type_more ${displayed ? "button_type_hidden" : ""}`}
      onClick={moreButtonHandler}
    >
      Ещё
    </button>
  );

  const saveMovie = (movie, likeHandler) => {
    api
      .saveMovie(movie, token)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie.data]);
        likeHandler(true);
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const deleteMovie = (movieId, likeHandler) => {
    const idInSavedMovies = getOneIdByAnother(movieId, savedMovies);
    api
      .deleteMovie(idInSavedMovies, token)
      .then(() => {
        likeHandler(false);

        setSavedMovies((state) =>
          state.filter((m) => m._id !== idInSavedMovies)
        );
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (localStorageData) {
      setLastSearchQuery(JSON.parse(localStorageData)?.searchQuery);
      setShortFilmsCheck(JSON.parse(localStorageData)?.isOnlyShortFilms);
    }
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setMovies(filteredShortMovies.slice(0, cardsCount))
        : setMovies(filteredMovies.slice(0, cardsCount));
    }
  }, [shortFilmsCheck, cardsCount, errorMessage]);

  useEffect(() => {
    if (localStorageData) {
      const updatedQueryData = JSON.parse(localStorageData);
      updatedQueryData.isOnlyShortFilms = shortFilmsCheck;
      localStorage.setItem("queryData", JSON.stringify(updatedQueryData));
    }
  }, [shortFilmsCheck, localStorageData]);

  // удаляем данные о всех фильмах при обновлении страницы
  useEffect(() => {
    window.addEventListener("beforeunload", removeAllMoviesData);
    return () => {
      window.removeEventListener("beforeunload", removeAllMoviesData);
    };
  }, []);

  // меняет отрисовку карточек от ширины экрана

  useEffect(() => {
    if (width >= sw1280) {
      setInitialCards(bigMooviesCount);
      setCardsInBundle(fourMovieInColumn);
    } else if (width > sw480 && width < sw768) {
      setInitialCards(middleMooviesCount);
      setCardsInBundle(twoMovieInColumn);
    } else if (width <= sw480) {
      setInitialCards(smallMooviesCount);
      setCardsInBundle(oneMoovieInColumn);
    }
  }, [width]);

  return (
    <HeadAndFoodWrapper>
      <main className="movies">
        <SearchForm
          submitHandler={submitHandler}
          checkbox={shortFilmsCheck}
          setCheckbox={setShortFilmsCheck}
          lastSearchQuery={lastSearchQuery}
          isLoading={isLoading}
        />
        <MoviesCardList
          allMovies={movies}
          savedMovies={savedMovies}
          onSaveHandler={saveMovie}
          onDeleteHandler={deleteMovie}
          onSavedPage={false}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        {!isLoading && (
          <p className="movies__message">{errorMessage || resultMessage}</p>
        )}
        <div className="movies__footer">
          {shortFilmsCheck
            ? cardsCount < filteredShortMovies.length &&
              !isLoading && <MoreButton displayed={errorMessage} />
            : cardsCount < filteredMovies.length &&
              !isLoading && <MoreButton displayed={errorMessage} />}
        </div>
      </main>
    </HeadAndFoodWrapper>
  );
}

export default Movies;
