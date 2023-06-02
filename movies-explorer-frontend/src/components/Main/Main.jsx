import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Promo from "../Promo/Promo";
import Portfolio from "../Portfolio/Portfolio";
import Techs from "../Techs/Techs";
import NavTab from "../NavTab/NavTab";

function Main() {
  return (
    <main>
      <section className="content">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </section>
    </main>
  );
}

export default Main;
