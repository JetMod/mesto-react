import { useEffect } from "react";
import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLink = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  useEffect(() => {
    avatarLink.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        ref={avatarLink}
        className="popup__input popup__input_type_link"
        name="avatar"
        placeholder="Ссылка на аватар"
        id="avatar-link-input"
        type="url"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
