import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../utils/Auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { isEmail, isPassword } from "../../utils/CustomInputValidation";
import { serverValidationMessages } from "../../utils/constants";

function Login() {
  //
  // Constants
  //

  let navigate = useNavigate();
  const globalState = React.useContext(CurrentUserContext);
  const [loggedIn, setLoggedIn] = useState(globalState.loggedIn);
  const [loginMessage, setLoginMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [buttonProps, setButtonProps] = useState({
    disabled: false,
    className: "login__submit_disabled",
  });

  const handleInputChange = (val) => {
    const { name, value, validationMessage } = val.target;
    let errMessage = validationMessage;
    if (name === "email") {
      setError({
        ...error,
        email: !!errMessage ? errMessage : isEmail(value),
      });
    } else {
      setError({
        ...error,
        password: !!errMessage ? errMessage : isPassword(value),
      });
    }

    setFormData({ ...formData, [name]: value });

    const haveSomeError = Object.keys(error).some(
      (key) => formData[key] === "" || errMessage
    );
    setButtonProps({
      disabled: haveSomeError,
      className: haveSomeError ? "login__submit_disabled" : "login__submit",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setButtonProps({ disabled: true, className: "login__submit_disabled" });

    auth
      .login(formData)
      .then(({token, user}) => {
        localStorage.setItem("jwt", token);
        setDisabled(false);
        setLoggedIn(true);
        globalState.loggedIn = true;
        globalState.user = user;
        setButtonProps({ disabled: false, className: "login__submit" });
      })
      .catch((code) => {
        setLoginMessage(serverValidationMessages[parseInt(code.match(/\d+/))]);
        setTimeout(() => {
          setLoginMessage("");
          setDisabled(false);
        }, 3000);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="login">
      <Link to="/" className="login__logo">
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__input-container">
          <CustomInput
            type="email"
            name="email"
            title="E-mail"
            onChange={handleInputChange}
            error={error.email}
            disabled={disabled}
          />
          <CustomInput
            type="password"
            name="password"
            title="Пароль"
            onChange={handleInputChange}
            error={error.password}
            disabled={disabled}
          />
        </div>
        <span className="login__message">{loginMessage}</span>
        <button
          className={`${buttonProps.className} text`}
          disabled={disabled || buttonProps.disabled}
        >
          Войти
        </button>
      </form>
      <div className="login__link-container">
        <p className="text color_text">Еще не зарегестрированны?</p>
        <Link to="/sign-up" className="login__link text">
          Рестистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
