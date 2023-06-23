import { createContext } from "react";

// export const currentUser = {
//   loggedIn: false,
//   loading: false,
//   user: { name: "", email: "", _id: "" },
//   savedMovie: {
//     movies: [],
//     saved: [],
//     filterShortFilms: false,
//     searchText: "",
//     notFound: "",
//     showedMovies: 0,
//   },
//   mainMovie: {
//     movies: [],
//     filterShortFilms: false,
//     searchText: "",
//     notFound: "",
//     showedMovies: 0,
//   },
//   toolTip: { message: "", isOpen: false, success: false },
// };
// export const CurrentUserContext = createContext();


export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});
