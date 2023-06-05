import { useCallback, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchText, setSearchText] = "";
  function onChangeFilter(e) {}

  function handleChange(e) {}

  function handleSubmit(e) {}

  const handleClickMoreMovies = useCallback(() => {}, []);

  return (
    <main className="movies">
      <SearchForm
        searchText={searchText}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        filterShortFilms={true}
        onChangeFilter={onChangeFilter}
      />
      <MoviesCardList
        handleClickMoreMovies={handleClickMoreMovies}
        isNotFound={isNotFound}
      />
    </main>
  );
}

export default Movies;
