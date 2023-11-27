import { useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      title,
      link,
    });
  }
  /**инициализация инпутов*/
  useEffect(() => {
    if (!props.isOpen) {
      setTitle("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        id="title-input"
        className="popup__input popup__input_type_title"
        type="text"
        name="title"
        value={title}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleTitleChange}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        id="link-input"
        className="popup__input popup__input_type_link"
        type="url"
        value={link}
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
