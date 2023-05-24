import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__container" name="{props.name}" onSubmit={props.onSubmit}>
        <button className="button popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
        <h2 className={`popup__header popup__header_type_${props.type}`}>{props.title}</h2>
        {props.children}
        <button className="button popup__button" type="submit">{props.buttonText || 'Сохранить'}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;