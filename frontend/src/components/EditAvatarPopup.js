import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      type="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__text"
          id="avatar-link"
          type="URL"
          name="avatar"
          placeholder="Ссылка на новый аватар"
          required
          ref={avatarRef}
        />
        <span
          className="avatar-link-error popup__text-error"
          id="avatar-link-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;