import React, { forwardRef } from "react";
import "./Techs.css";

const Techs = forwardRef((props, ref) => {
  return (
    <section className="techs" ref={ref}>
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__list text">
        <li className="techs__list-item color_secondary">HTML</li>
        <li className="techs__list-item color_secondary">CSS</li>
        <li className="techs__list-item color_secondary">JS</li>
        <li className="techs__list-item color_secondary">React</li>
        <li className="techs__list-item color_secondary">Git</li>
        <li className="techs__list-item color_secondary">Express.js</li>
        <li className="techs__list-item color_secondary">mongoDB</li>
      </ul>
    </section>
  );
});

export default Techs;
