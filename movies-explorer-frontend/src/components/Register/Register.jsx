import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../utils/Auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { isEmail, isPassword, isName } from "../../utils/CustomInputValidation";
import { useNavigate } from "react-router-dom";
import { serverValidationMessages } from"../../utils/constants"

function Register() {
  //
  // Constants
  //
  const navigate = useNavigate();
  const globalState = React.useContext(CurrentUserContext);
  const [loggedIn, setLoggedIn] = useState(globalState.loggedIn);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [registerMessage, setRegisterMessage] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttonProps, setButtonProps] = useState({
    disabled: true,
    className: "register__submit_disabled",
  });

  const handleInputChange = (val) => {
    const { name, value, validationMessage } = val.target;
    let errMessage = validationMessage;
    if (name === "email") {
      setError({
        ...error,
        email: !!errMessage ? errMessage : isEmail(value),
      });
    } else if (name === "name") {
      setError({
        ...error,
        name: !!errMessage ? errMessage : isName(value),
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
      className: haveSomeError
        ? "register__submit_disabled"
        : "register__submit",
    });
  };

  const handleSubmit = (formValue) => {
    formValue.preventDefault();
    setDisabled(true);
    setButtonProps({ disabled: true, className: "register__submit_disabled" });
    auth.register(formData).then(() => {
      setDisabled(false);
      setLoggedIn(true);
      setButtonProps({ disabled: false, className: "register__submit" });
      auth.login(formData).then(({token, user}) => {
        localStorage.setItem("jwt", token);
        globalState.loggedIn = true;
        globalState.user = user;
      });
    }).catch((code) => {
      setRegisterMessage(serverValidationMessages[parseInt(code.match(/\d+/))])
      setTimeout(() => {
        setRegisterMessage('');
        setDisabled(false);
      }, 3000)
    });
  };


  useEffect(() => {
    if  (loggedIn) {
       navigate("/movies");
    };
  }, [loggedIn, navigate]);


  return (
    <div className="register">
      <Link to="/" className="register__logo">
        <img src={logo} alt="Логотип" />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__input-container">
          <CustomInput
            name="name"
            title="Имя"
            onChange={handleInputChange}
            error={error.name}
            disabled={disabled}
            type="text"
          />
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
        <span className="register__message">{registerMessage}</span>
        <button
          className={`${buttonProps.className} text`}
          disabled={disabled || buttonProps.disabled}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__link-container">
        <p className="text color_text">Уже зарегестрированны?</p>
        <Link to="/sign-in" className="register__link text">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
