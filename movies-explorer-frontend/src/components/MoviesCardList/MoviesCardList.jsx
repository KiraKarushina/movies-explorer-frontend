import MovieCard from "../MovieCard/MovieCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  allMovies,
  onSavedPage,
  onSaveHandler,
  onDeleteHandler,
  savedMovies,
  isLoading
}) {

  return (
    <div className="cards">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <p className="cards__message text_subtitle"></p>
          <div className="cards__list">
            {allMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id || movie._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
