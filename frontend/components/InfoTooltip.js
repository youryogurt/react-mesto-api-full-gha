import React from "react";
import successfulIncon from '../images/successful-registration-icon.svg';
import unSuccessfulIncon from '../images/unsuccessful-icon.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_success ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
        <img className="popup__success-image" src={`${props.isSuccess ? successfulIncon : unSuccessfulIncon}`} alt="" />
        <p className="popup__info-text">{`${props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;