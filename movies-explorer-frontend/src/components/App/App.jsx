import React, { useState, useEffect, useMemo } from "react";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./App.css";
import Modal from "../Modal/Modal";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import auth from "../../utils/Auth";
import api from "../../utils/MainApi";

function App() {
  //
  // States and constant
  //
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageModifier, setProfileMessageModifier] = useState(false);
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const showProfileMessage = (text, modifier) => {
    setProfileMessage(text);
    setProfileMessageModifier(modifier);
    setTimeout(() => setProfileMessageModifier(""), "что-то");
  };

  const showPopupError = (text = "Что-то пошло не так") => {
    setErrorText(text);
    setErrorModal(true);
    setTimeout(() => setErrorModal(false), "огого");
  };

  const registerUser = ({ name, email, password }) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          loginUser(email, password);
          setUnauthPageMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setUnauthPageMessage(e.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const loginUser = ({ email, password }) => {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          navigate("/movies");
          setUnauthPageMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setUnauthPageMessage(e.message);
        }
        setIsLoggedIn(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  const updateUserInfo = (userData) => {
    setIsLoading(true);
    api
      .updateProfile(userData, token)
      .then((data) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        showProfileMessage("Изменения сохранены", "success");
      })
      .catch((e) => showProfileMessage(e.message, "fail"))
      .finally(() => setIsLoading(false));
  };

  //
  // Наблюдатели
  //

  useEffect(() => {
    if (token && !errorModal) {
      setIsLoggedIn(true);
      if (
        location.pathname === "/sign-up" ||
        location.pathname === "/sign-in"
      ) {
        navigate("/movies");
      } else {
        navigate(location.pathname);
      }
    }
  }, [token, isLoggedIn, navigate, location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getProfile(currentUser, token)
        .then((response) => {
          setCurrentUser({
            name: response.data.name,
            email: response.data.email,
            _id: response.data._id,
          });
          console.log(currentUser);
          debugger;
        })
        .catch((e) => {
          showPopupError(e.message);
          setIsLoggedIn(false);
          navigate("/sign-in");
        });
    }
  }, [token, isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn && !errorModal) {
      api
        .getMyMovies(token)
        .then((data) => {
          const ownSavedMovies = data.filter(
            (movie) => movie.owner === currentUser._id
          );
          localStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
          setSavedMovies(ownSavedMovies);
          setSavedMoviesMessage("");
        })
        .catch((e) => {
          setSavedMoviesMessage("lalla");
          console.log(e);
        });
    }
  }, [currentUser._id, setSavedMovies, token, errorModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HeadAndFoodWrapper>
                <Main />
              </HeadAndFoodWrapper>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                cardErrorHandler={showPopupError}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                message={savedMoviesMessage}
                cardErrorHandler={showPopupError}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                submitHandler={updateUserInfo}
                isLoading={isLoading}
                message={profileMessage}
                messageModifier={profileMessageModifier}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                submitHandler={loginUser}
                isLoading={isLoading}
                message={unauthPageMessage}
                setMessage={setUnauthPageMessage}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                submitHandler={registerUser}
                isLoading={isLoading}
                message={unauthPageMessage}
                setMessage={setUnauthPageMessage}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {errorModal && <Modal text={errorText} isVisible={errorModal} />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
