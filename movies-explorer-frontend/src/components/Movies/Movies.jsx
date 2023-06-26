import { useCallback, useEffect, useState } from "react";
import api from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchText, setSearchText] = "";
  const [movies, setMovies] = useState([]);
  const [isFilteredShortFilms, setIsFilteredShortFilms] = useState(false);
  function onChangeFilter(e) {
    setIsFilteredShortFilms(e.target.checked)
  }

  function handleChange(e) {}

  function handleSubmit(e) {}

  const handleClickMoreMovies = useCallback(() => {}, []);



  useEffect(()=> {
    api.getMovies().then((movies) => {
        setMovies(movies)});
    }, [])

  return (
    <main className="movies">
      <SearchForm
        searchText={searchText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        filterShortFilms={isFilteredShortFilms}
        onChangeFilter={onChangeFilter}
      />
      <MoviesCardList
        handleClickMoreMovies={handleClickMoreMovies}
        isNotFound={isNotFound}
        isFilteredShortFilms={false}
        showedCountMovies={12}
        movies= {movies}
      />
    </main>
  );
}

export default Movies;