import React, {useEffect} from "react";
import CustomInput from "../CustomInput/CustomInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { isEmail, isPassword, isName } from "../../utils/CustomInputValidation";

function Register({ submitHandler, isLoading, message, setMessage }) {
  //
  // Constants
  //
  
  const [error, setError] = useState({ name: "", email: "", password: "" });
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
    setMessage('');
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
    setButtonProps({ disabled: true, className: "register__submit_disabled" });
    submitHandler(formData);
  };

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
            disabled={isLoading}
            type="text"
          />
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
        <span className="register__message">{message}</span>
        <button
          className={`${buttonProps.className} text`}
          disabled={isLoading || buttonProps.disabled}
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
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
