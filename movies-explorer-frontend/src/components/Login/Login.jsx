import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../utils/Auth";
import { isEmail, isPassword } from "../../utils/CustomInputValidation";
import { serverValidationMessages } from "../../utils/constants";

function Login({ submitHandler, isLoading, message, setMessage }) {
  //
  // Constants
  //

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
    setMessage('');
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
    setButtonProps({ disabled: true, className: "login__submit_disabled" });
    submitHandler(formData);
  
  };

  useEffect(() => setMessage(""), [setMessage]);

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
            disabled={isLoading}
          />
          <CustomInput
            type="password"
            name="password"
            title="Пароль"
            onChange={handleInputChange}
            error={error.password}
            disabled={isLoading}
          />
        </div>
        <span className="login__message">{message}</span>
        <button
          className={`${buttonProps.className} text`}
          disabled={isLoading || buttonProps.disabled}
        >
         {isLoading ? "Загрузка..." : "Войти"}
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
