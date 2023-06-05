import Filter from "../Filter/Filter";

function SearchForm({ searchText, handleChange, handleSubmit, onChangeFilter, filterShortFilms}) {
  return (
    <div className="search color_background">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__form-input"
          placeholder="Фильм"
          value={searchText}
          onChange={handleChange}
          required
        />
        <button className="search__submit link" type="submit"></button>
      </form>
      <Filter filterShortFilms={filterShortFilms} onChangeFilter={onChangeFilter}></Filter>
    </div>
  );
}

export default SearchForm;