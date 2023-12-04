import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(" ");
  const [description, setDescription] = React.useState(" ");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        name="name"
        id="name-input"
        type="text"
        placeholder="Имя"
        value={name || ""}
        minLength="2"
        maxLength="40"
        required
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        value={description || ""}
        id="work-input"
        className="popup__input popup__input_type_work"
        type="text"
        name="about"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        required
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error work-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
