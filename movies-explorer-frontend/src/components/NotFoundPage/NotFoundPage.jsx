import React from "react"
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <section className="error">
      <h1 className="error__title">404</h1>
      <p className="error__message text">Страница не найдена</p>
      <button className="error__button link" onClick={handleClick}>
        Назад
      </button>
    </section>
  );
};

export default NotFoundPage;
