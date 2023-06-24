import { useState, useCallback, useEffect, useContext } from "react";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { isEmail, isName } from "../../utils/CustomInputValidation";
import HeadAndFoodWrapper from "../HeadAndFoodWrapper/HeadAndFoodWrapper";

function Profile({ setIsLoggedIn, submitHandler, isLoading, handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [buttonProps, setButtonProps] = useState({
    disabled: true,
    className: "profile__submit_disabled",
  });

  const checkEdit = useCallback(() => {
    if (currentUser.name !== userName || currentUser.email !== userEmail) {
      if (!isName(userName) && !isEmail(userEmail)) {
        setButtonProps({ disabled: false, className: "profile__submit" });
        return;
      }
    }
    setButtonProps({ disabled: true, className: "profile__submit_disabled" });
  }, [currentUser, userName, userEmail]);

  useEffect(() => {
    checkEdit();
  }, [checkEdit]);

  useEffect(() => {
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  function handleNameInputChange(e) {
    setUserName(e.target.value);
  }

  function handleEmailInputChange(e) {
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitHandler({
      name: userName,
      email: userEmail,
    });
  }
  return (
    <HeadAndFoodWrapper>
      <section className="profile">
        <h1 className="profile__title text_medium">
          Привет, {currentUser.name}!
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
              disabled={isLoading}
            />
          </label>
          <label className="profile__label">
            <input
              name="email"
              type="text"
              className="profile__input"
              onChange={handleEmailInputChange}
              value={userEmail}
              disabled={isLoading}
            />
          </label>
          <button
            type="submit"
            className={`${buttonProps.className} text`}
            onClick={handleSubmit}
            disabled={buttonProps.disabled}
          >
            {isLoading ? "Сохраняем..." : "Редактировать"}
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
