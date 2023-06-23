import { useState, useCallback, useEffect, useContext } from "react";
import React from "react";
import auth from "../../utils/Auth";
import api from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { isEmail, isName } from "../../utils/CustomInputValidation";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";

function Profile(props) {
  let navigate = useNavigate();
  const userContext = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(userContext.user.name);
  const [userEmail, setUserEmail] = useState(userContext.user.email);
  const [buttonProps, setButtonProps] = useState({
    disabled: true,
    className: "profile__submit_disabled",
  });

  const checkEdit = useCallback(() => {
    if (
      userContext.user.name !== userName ||
      userContext.user.email !== userEmail
    ) {
      if (!isName(userName) && !isEmail(userEmail)) {
        setButtonProps({ disabled: false, className: "profile__submit" });
        return;
      }
    }
    setButtonProps({ disabled: true, className: "profile__submit_disabled" });
  }, [userContext, userName, userEmail]);

  useEffect(() => {
    checkEdit();
  }, [checkEdit]);

  function handleNameInputChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailInputChange(e) {
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .updateProfile({
        name: userName,
        email: userEmail,
      })
      .then((res) => {
        userContext.user.name = userName;
        userContext.user.email = userEmail;
        userContext.toolTip = {
          message: "Успех!",
          isOpen: true,
          success: true,
        };
      })
      .catch((err) => {
        userContext.toolTip = {
          message: err.message,
          isOpen: true,
          success: false,
        };
        props.showToolTip();
      });
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        userContext.loggedIn = false;
        localStorage.removeItem("jwt");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <HeadAndFoodWrapper>
      <section className="profile">
        <h1 className="profile__title text_medium">
          Привет, {userContext.user.name}!
        </h1>
        <form action="submit" className="profile__form text">
          <label className="profile__label underline-pb20">
            <input
              name="name"
              type="text"
              className="profile__input"
              onChange={handleNameInputChange}
              value={userName}
              minLength={2}
            />
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
              onChange={handleEmailInputChange}
              value={userEmail}
            />
          </label>
          <button
            type="submit"
            className={`${buttonProps.className} text`}
            onClick={handleSubmit}
            disabled={buttonProps.disabled}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__logout link text" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </section>
    </HeadAndFoodWrapper>
  );
}

export default Profile;
