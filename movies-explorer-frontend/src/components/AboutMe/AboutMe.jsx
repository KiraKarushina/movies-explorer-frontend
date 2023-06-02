
import foto from "../../images/photo.svg";
import './AboutMe.css';
import React from 'react';

function AboutMe () {
  return (
    <section className="about">
      <h2 className="about__header text_subtitle underline-pb25">Студент</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title text_title">Виталий</h3>
          <p className="about__info-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about__info-description text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
После того, как прошёл курс по веб-разработке, 
начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about__links text">
            <li>
              <a href="https://vk.com/" className="link" target="_blank" rel="noreferrer">
                ВКонтакте
              </a>
            </li>
            <li>
              <a href="https://github.com/g28xyz" className="link" target="_blank" rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className="about__info-image" src={foto} alt="Фотография студента" />
      </div>
    </section>
  );
};

export default AboutMe;