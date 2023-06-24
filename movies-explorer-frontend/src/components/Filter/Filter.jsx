
function Filter({ onChangeFilter, filterShortFilms }) {
  const onClickFilter = () => onChangeFilter(!filterShortFilms);
  return (
    <div className="filter">
        <p className="text">Короткометражки</p>
      <label className="filter__label">
        <input
          type="checkbox"
          className="filter__input"
          onChange={onClickFilter}
          checked={filterShortFilms}
        />
        <span className="filter__switch"></span>
      </label>
    </div>
  );
}

export default Filter;