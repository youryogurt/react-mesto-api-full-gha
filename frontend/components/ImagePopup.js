import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={props.card?.link} alt={props.card ? props.card.name : ''}/>
        <button className="button popup__close-button" aria-label="close" onClick={props.onClose}></button>
        <p className="popup__caption">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;