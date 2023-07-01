import React from "react";
import deniedImage from "../../images/denied.png";
import successImage from "../../images/success.png";

const Modal = ({ text, isVisible, success }) => {

  return (
    <div className={`modal ${isVisible && "modal_opened"}`}>
      <div className="modal__overlay"></div>
      <div className="modal__container">
        <div>
          <img
            className="modal__icon"
            src={success? successImage : deniedImage}
            alt="Cтатус"
          />
          <h3 className="modal__title">{text}</h3>
        </div>
      </div>
    </div>
    )
};

export default Modal;
