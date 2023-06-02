import React from 'react';
import arrow from "../../images/arrow.svg";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title text color_text">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item underline-pb20">
          <a
            className="portfolio__link link"
            href="https://github.com/KiraKarushina/how-to-learn.git"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Статичный сайт</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item underline-pb20">
          <a
            className="portfolio__link link"
            href="https://github.com/KiraKarushina/russian-travel.git"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Адаптивный сайт</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href="https://github.com/KiraKarushina/mesto.git"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text_medium">Одностраничное приложение</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}


export default Portfolio;