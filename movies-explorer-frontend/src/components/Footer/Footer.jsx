import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title text color_text underline-pb20">
        Учебный проект Яндекс.Практикум.
      </h3>
      <div className="footer__row">
        <p className="footer__text">&#169; 2023</p>
        <nav>
          <ul className="footer__list text">
            <li>
              <a
                href="https://practicum.yandex.ru/profile/web"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Yandex-Practicum"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
