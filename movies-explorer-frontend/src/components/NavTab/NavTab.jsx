import '../Promo/Promo.css';

function NavTab ({clickCallBack}) {
    return (
      <nav>
        <ul className="promo__list">
          <li
            name="aboutProject"
            className="promo__list-item color_secondary text"
            onClick={clickCallBack}
          >
            О проекте
          </li>
          <li
            name="techs"
            className="promo__list-item color_secondary text"
            onClick={clickCallBack}
          >
            Технологии
          </li>
          <li
            name="aboutMe"
            className="promo__list-item color_secondary text"
            onClick={clickCallBack}
          >
            Студент
          </li>
        </ul>
      </nav>
    );
  };
  
  export default NavTab;