import React, { useState } from "react";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./App.css";
import InfoToolTip from "../InfoTooTip/InfoToolTip";
import Modal from "../Modal/Modal";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  //
  //States
  //

  const globalState = React.useContext(CurrentUserContext);

  const [toolTip, setToolTip] = useState({
    message: "",
    isOpen: false,
    success: true,
  });

  return (
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
              <HeadAndFoodWrapper>
                <Movies />
              </HeadAndFoodWrapper>
          }
        />
        <Route
          path="/saved-movies"
          element={
              <HeadAndFoodWrapper>
                <SavedMovies />
              </HeadAndFoodWrapper>
          }
        />
        <Route
          path="/profile"
          element={
              <HeadAndFoodWrapper>
                <Profile />
              </HeadAndFoodWrapper>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {toolTip.isOpen && (
        <Modal>
          <InfoToolTip />
        </Modal>
      )}
    </div>
  );
}

export default App;
