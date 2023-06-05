import React from "react"
import CustomInput from "../CustomInput/CustomInput";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import auth from "../../utils/Auth";

function Login() {

        //
    // Constants
    //

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "" });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
    
  //register__submit_disabled TODO обновить позже на register__submit_disabled
    const [buttonProps, setButtonProps] = useState({
      disabled: true,
      className: "login__submit",
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
        setButtonProps({ disabled: true, className: "login__submit_disabled" });
        auth.login(formData).then(() => {
            setDisabled(false);
            setButtonProps({ disabled: false, className: "login__submit" });
        });
      };

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