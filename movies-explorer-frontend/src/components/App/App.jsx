import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFounfPage";
import "./App.css";
import InfoToolTip from "../InfoTooTip/InfoToolTip";
import Modal from "../Modal/Modal";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  //
  //States
  //

  const [loggedIn, setLoggedIn] = useState(false);

  const [toolTip, setToolTip] = useState({
    message: "",
    isOpen: false,
    success: true,
  });

  return (
    <div className="page">
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer></Footer>
      {toolTip.isOpen && (
        <Modal>
          <InfoToolTip />
        </Modal>
      )}
    </div>
  );
}

export default App;
