function ImagePopup(props) {
  function handlePopupMouseDown(event) {
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains("popup__close")
    ) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_image popup_background_dark-light ${
        Object.entries(props.card).length ? "popup_opened" : ""
      }`}
      onMouseDown={handlePopupMouseDown}
    >
      <div className="popup__image-container">
        <button className="popup__close link" type="button"></button>
        <img
          className="popup__image"
          src={props.card.link}
          alt="Изображение из карточки"
        />
        <h3 className="popup__image-text">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
