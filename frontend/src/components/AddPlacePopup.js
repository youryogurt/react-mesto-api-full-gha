import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      type="add-card"
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      // buttonText={isLoading? 'Сохранение...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__text"
          id="place-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name || ""}
          onChange={handleNameChange}
        />
        <span
          className="place-name-error popup__text-error"
          id="place-name-error"
        ></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__text"
          id="link"
          type="URL"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span className="link-error popup__text-error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
