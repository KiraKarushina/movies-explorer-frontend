import {useState } from "react";
import auth from "../../utils/Auth";
import api from "../../utils/MainApi";


function Profile() {
  const [userData, setUserData] = useState({
    name: 'Darya',
    email: ''
  });

  const [buttonProps, setButtonProps] = useState({
    disabled: true,
    className: "profile__submit_disabled",
  });

  function handleChange(e) {
      console.log(e)
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.updateProfile().then(info => setUserData(info))
  }

  function handleLogout() {
      auth.logout();
  }

  return (
    <section className="profile">
      <h1 className="profile__title text_medium">Привет, {userData.name}!</h1>
      <form action="submit" className="profile__form text">
        <label className="profile__label underline-pb20">
          <input
            name="name"
            type="text"
            className="profile__input"
            onChange={handleChange}
            minLength={2}
          />
        </label>
        <label className="profile__label">
          <input
            name="email"
            type="text"
            className="profile__input"
            onChange={handleChange}
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
  );
}

export default Profile;