import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Promo from "../Promo/Promo";
import Portfolio from "../Portfolio/Portfolio";
import Techs from "../Techs/Techs";
import NavTab from "../NavTab/NavTab";
import { useRef } from "react";

function Main() {
  const refs = {
    aboutProject: useRef(null),
    techs: useRef(null),
    aboutMe: useRef(null),
  };

  function clickCallBack(e) {
    const name = e.target.attributes.name.value;
    const element = refs[name].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <main className="content">
        <Promo>
          <NavTab clickCallBack={clickCallBack} />
        </Promo>
        <AboutProject ref={refs.aboutProject} />
        <Techs ref={refs.techs} />
        <AboutMe ref={refs.aboutMe} />
        <Portfolio />
    </main>
  );
}

export default Main;
