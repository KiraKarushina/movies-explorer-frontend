import React from "react"
import CustomInput from "../CustomInput/CustomInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../utils/Auth";


function Register() {

    //
    // Constants
    //

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({ name: "", email: "testError", password: "" });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
    
  //register__submit_disabled TODO обновить позже на register__submit_disabled
    const [buttonProps, setButtonProps] = useState({
      disabled: true,
      className: "register__submit",
    });

    const handleInputChange = (val) => {
        const { name, value } = val.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }

    const handleSubmit = (formValue) => {
        formValue.preventDefault();
        setDisabled(true);
        setButtonProps({ disabled: true, className: "register__submit_disabled" });
        auth.register(formData).then(() => {
            setDisabled(false);
            setButtonProps({ disabled: false, className: "register__submit" });
        });
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


