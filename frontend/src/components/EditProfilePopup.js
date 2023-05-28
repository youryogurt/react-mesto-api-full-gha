import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="editing"
      type="editing"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__text"
          id="name"
          type="text"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="name-error popup__text-error" id="name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__text"
          id="job"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          required
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="job-error popup__text-error" id="job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;