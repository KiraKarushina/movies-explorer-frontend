import foto from "../../images/foto.jpg";
import "./AboutMe.css";
import React, { forwardRef } from "react";

const AboutMe = forwardRef((props, ref) => {
  return (
    <section className="about" ref={ref}>
      <h2 className="about__title">Студент</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title text_title">Дарья</h3>
          <p className="about__info-subtitle">Фронтенд-разработчик, 32 года</p>
          <p className="about__info-description text">
            Я родилась в Челябинске, живу в Москве. Закончила факультет социально-культурного сервиса и туризма РГУТиС. Люблю слушать музыку, читать фантастические романы, увлекаюсь
            спортов. Недавно начала кодить. С 2020 года работаю копирайтером на фрилансе. После того, как прошла курс по веб-разработке, начала
            заниматься фриланс-заказами, совмещая их с писательством и редактурой.
          </p>
              <a
                href="https://github.com/KiraKarushina"
                className="git__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
        </div>
        <img
          className="about__info-image"
          src={foto}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
});

export default AboutMe;
