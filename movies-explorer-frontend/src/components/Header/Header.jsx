import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import account from "../../images/account.svg"
import closeIcon from "../../images/close.svg";
import { GlobalContext } from "../../contexts/GlobalContext";

function Header() {
  //   const location = useLocation();
  const globalState = React.useContext(GlobalContext);
  const menuRef = useRef();

  const handleOpenMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "flex";
  };

  const handleCloseMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "";
  };
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} className="header__logo" alt="лого" />
      </Link>
      <nav className="header__navigate header__navigate-movies">
        <ul className="header__movies text" ref={menuRef}>
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
            <Link to="/saved-movies" className="link" onClick={handleCloseMenu}>
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
          <img src={closeIcon} alt="иконка бургера" />
        </div>
      </nav>

      {!globalState.loggedIn && (
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
