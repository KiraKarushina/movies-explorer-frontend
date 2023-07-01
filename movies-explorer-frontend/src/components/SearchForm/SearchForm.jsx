import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";

function SearchForm({
  checkbox,
  setCheckbox,
  lastSearchQuery,
  isLoading,
  submitHandler,
}) {
  
  //
  // States
  //

  const [query, setQuery] = useState("");
  const [errorText, setErrorText] = useState("");

  function handleQueryInputChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (lastSearchQuery) {
      setQuery(lastSearchQuery);
    }
  }, [lastSearchQuery]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (query === "") {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    if (e) {
      submitHandler(checkbox, query);
      setErrorText("");
    }
  };

  return (
    <div className="search">
      <form noValidate className="search__form" onSubmit={onSubmitForm}>
        <div className="search__form-iput-section">
          <input
            type="text"
            className="search__form-input"
            placeholder="Фильм"
            value={query}
            onChange={handleQueryInputChange}
            required
            disabled={isLoading}
          />
          <span className="search__form-input-error">{errorText}</span>
        </div>
        <button className="search__submit link" type="submit">
          Найти
        </button>
      </form>
      <Filter filterShortFilms={checkbox} onChangeFilter={setCheckbox}></Filter>
    </div>
  );
}

export default SearchForm;
