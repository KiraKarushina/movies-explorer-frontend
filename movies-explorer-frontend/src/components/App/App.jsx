import React, { useState, useEffect } from "react";
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
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  //
  // Модальное окно
  //
  
  const [errorText, setErrorText] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const showModal = (text = "Что-то пошло не так...", success = false) => {
    setErrorText(text);
    setErrorModal(true);
    setSuccess(success);
    setTimeout(() => setErrorModal(false), 3000);
  };

  //
  // Обработчики
  //

  const registerUser = ({ name, email, password }) => {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          loginUser({
            email: email,
            password: password,
          });
          setUnauthPageMessage("");
        }
      })
      .catch((e) => {
        const message = e?.message ? e.message : e;
        setUnauthPageMessage(message);
      })
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
      .catch((e) => {
        const message = e?.message ? e.message : e;
        setUnauthPageMessage(message);
        setIsLoggedIn(false);
      })
      .finally(() => setIsLoading(false));
  };

  const updateUserInfo = (userData) => {
    setIsLoading(true);
    api
      .updateProfile(userData, token)
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        });
        showModal("Успех", true);
      })
      .catch((e) => showModal(e?.message))
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    auth
      .logout(token)
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("queryData");
        localStorage.removeItem("savedMovies");
        localStorage.removeItem("allMoviesData");
        setIsLoggedIn(false);
        setCurrentUser({
          name: "",
          email: "",
        });
        navigate("/");
      })
      .catch((err) => console.log(err));
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
        })
        .catch((e) => {
          showModal(e.message);
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
          const ownSavedMovies = data.data.filter(
            (movie) => movie.owner === currentUser._id
          );
          localStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
          setSavedMovies(ownSavedMovies);
          setSavedMoviesMessage("");
        })
        .catch((e) => {
          setSavedMoviesMessage(e?.message);
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
                cardErrorHandler={showModal}
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
                cardErrorHandler={showModal}
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
                handleLogout={handleLogout}
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

        <Modal text={errorText} isVisible={errorModal} success={success} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
