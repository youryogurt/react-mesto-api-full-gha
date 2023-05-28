import React from 'react';
import changeAvatar from '../images/change-avatar.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" alt="" src={currentUser.avatar} />
            <button className="button profile__change-avatar-button" onClick={onEditAvatar}>
              <img className="profile__change-avatar-image" src={changeAvatar} alt="Карандаш" />
            </button>
          </div>
          <div className="profile__text">
            <div className="profile__user">
              <h1 className="profile__full-name">{currentUser.name}</h1>
              <button className="profile__popup-open button" type="button" aria-label="open editing popup" onClick={onEditProfile}></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button className="add-button button" type="button" aria-label="open new card adding popup" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;