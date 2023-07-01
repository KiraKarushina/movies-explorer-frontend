import React, { useRef, useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import account from "../../images/account.svg";
import closeIcon from "../../images/close.svg";
import burgerIcon from "../../images/burger.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { currentUser } = useContext(CurrentUserContext);
  const menuRef = useRef();

  const handleOpenMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "flex";
  };

  const handleCloseMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "";
  };

  useEffect(() => {
    currentUser.name === "" ? setIsLoggedIn(false) : setIsLoggedIn(true);
  }, [currentUser.name]);

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="лого" />
      </Link>
      {isLoggedIn && (
        <nav className="header__navigate header__navigate-movies">
          <ul className="header__movies text" ref={menuRef}>
            <li className="header__movies-item">
              <div className="link" onClick={handleCloseMenu}>
                <img src={closeIcon} alt="close icon" />
              </div>
            </li>
            <li className="header__movies-item">
              <Link to="/" className="link" onClick={handleCloseMenu}>
                Главная
              </Link>
            </li>
            <li className="header__movies-item">
              <Link to="/movies" className="link" onClick={handleCloseMenu}>
                Фильмы
              </Link>
            </li>
            <li className="header__movies-item">
              <Link
                to="/saved-movies"
                className="link"
                onClick={handleCloseMenu}
              >
                Сохранённые фильмы
              </Link>
            </li>
            <li className="header__movies-item">
              <Link
                to="/profile"
                className="header__link-profile link"
                onClick={handleCloseMenu}
              >
                Аккаунт
                <img src={account} className="header__account" alt="аккаунт" />
              </Link>
            </li>
          </ul>
          <div className="header__burger link" onClick={handleOpenMenu}>
            <img src={burgerIcon} alt="иконка бургера" />
          </div>
        </nav>
      )}

      {!isLoggedIn && (
        <nav>
          <ul className="header__auth text">
            <li className="header__auth-item link">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__auth-item link">
              <Link to="/sign-in" className="header__link color_primary">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
