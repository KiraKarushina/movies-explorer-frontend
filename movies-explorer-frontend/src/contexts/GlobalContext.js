import React from "react";

const globaState = {
  loggedIn: false,
  loading: false,
  user: { name: "", email: "", _id: "" },
  savedMovie: {
    movies: [],
    saved: [],
    filterShortFilms: false,
    searchText: "",
    notFound: "",
    showedMovies: 0,
  },
  mainMovie: {
    movies: [],
    filterShortFilms: false,
    searchText: "",
    notFound: "",
    showedMovies: 0,
  },
  toolTip: { message: "", isOpen: false, success: true },
  authMessage: "",
};
export const GlobalContext = React.createContext(globaState);
