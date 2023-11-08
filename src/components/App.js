import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import "../index.css";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }
  return (
    <body className="body">
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        >
          <input
            id="avatar-link-input"
            className="popup__input popup__input_type_link"
            type="url"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="popup__input-error avatar-link-input-error"></span>
          <button className="popup__submit link" type="submit">
            Сохранить
          </button>
        </PopupWithForm>

        <PopupWithForm
          title="Редактировать профиль"
          name="profile"
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
        >
          <input
            id="name-input"
            className="popup__input popup__input_type_name"
            type="text"
            name="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error name-input-error"></span>
          <input
            id="work-input"
            className="popup__input popup__input_type_work"
            type="text"
            name="about"
            placeholder="Род деятельности"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error work-input-error"></span>
          <button className="popup__submit link" type="submit">
            Сохранить
          </button>
        </PopupWithForm>

        <PopupWithForm
          title="Новое место"
          name="card"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        >
          <input
            id="title-input"
            className="popup__input popup__input_type_title"
            type="text"
            name="title"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error title-input-error"></span>
          <input
            id="link-input"
            className="popup__input popup__input_type_link"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error link-input-error"></span>
          <button className="popup__submit link" type="submit">
            Создать
          </button>
        </PopupWithForm>

        <PopupWithForm
          title="Вы уверены?"
          name="card-delete"
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
        >
          <button
            className="popup__submit popup__submit_type_confirm link"
            type="submit"
          >
            Да
          </button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </body>
  );
}

export default App;
