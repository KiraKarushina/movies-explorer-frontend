import { useCallback, useState } from "react";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  const [isNotFound, setIsNotFound] = useState(false);
  const searchText = "фильм";
  const [isFilteredShortFilms, setIsFilteredShortFilms] = useState(false);
  function onChangeFilter(e) {
    setIsFilteredShortFilms(e.target.checked)
  }

  function handleChange(e) {}

  function handleSubmit(e) {}

  const handleClickMoreMovies = useCallback(() => {}, []);

  return (
    <HeadAndFoodWrapper>
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
        isFilteredShortFilms={true}
        showedCountMovies={12}
        movies= {[]}
      />
    </main>
    </HeadAndFoodWrapper>
  );
}

export default SavedMovies;
