import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `gallery__like-button ${isLiked && 'gallery__like-button_active'}` 
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div key={card._id} className="gallery__card">
    <img className="gallery__image" src={card.link} alt={card.name} onClick={handleCardClick} />
    {isOwn && <button className="gallery__delete-button gallery__delete-button_visible button" onClick={handleDeleteClick} />} 
      <div className="gallery__caption">
        <p className="gallery__place-name">{card.name}</p>
        <div className="gallery__like-section">
          <button className={`button ${cardLikeButtonClassName}`} type="button" onClick={handleLikeClick} ></button>
          <p className="gallery__likes-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;