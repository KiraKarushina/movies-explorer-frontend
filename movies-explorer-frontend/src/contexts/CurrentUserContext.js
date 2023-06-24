import { createContext } from "react";

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});
