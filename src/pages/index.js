// импорт стилей
import "./index.css";

// импорт данных
import {
  formConf,
  cardConf,
  avatarPopup,
  profilePopupForm,
  cardPopupForm,
  profileAvatarEdit,
  profileEditButton,
  profileAddButton,
  profileInputName,
  profileInputWork,
} from "../utils/constants.js";

// импорт классов
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

let userId;

// экземпляры класса для валидации форм
const avatarFormValidator = new FormValidator(formConf, avatarPopup);
const profileFormValidator = new FormValidator(formConf, profilePopupForm);
const cardFormValidator = new FormValidator(formConf, cardPopupForm);

// экземпляр класса для взаимодействия с сервером
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-74",
  name: "3a0bc90b-66b6-4f48-8f85-65228044ae82",
});

// экземпляр класса для взаимодействия с профилем
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  workSelector: ".profile__work",
  avatarSelector: ".profile__avatar-image",
});

// экземпляр класса для вставки карточек
const cardSection = new Section((item) => {
  cardSection.addItemToTheBeginning(createCard(item));
}, ".cards");

// экземпляры классов для взаимодействия с попапами
const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_type_card-delete"
);

const popupWithImage = new PopupWithImage(".popup_value_image");

const cardPopupWithForm = new PopupWithForm(".popup_add-card", (data) => {
  cardPopupWithForm.renderLoading(true);

  api
    .addNewCard(data)
    .then((data) => {
      cardSection.addItemToTheEnd(createCard(data));
      cardPopupWithForm.close();
      cardFormValidator.resetPopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      cardPopupWithForm.renderLoading(false);
    });
});

const avatarPopupWithForm = new PopupWithForm(".popup_type_avatar", (data) => {
  avatarPopupWithForm.renderLoading(true);

  api
    .saveAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopupWithForm.close();
      avatarFormValidator.resetPopup();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      avatarPopupWithForm.renderLoading(false);
    });
});

const profilePopupWithForm = new PopupWithForm(
  ".popup_edit-profile",
  (data) => {
    profilePopupWithForm.renderLoading(true);

    api
      .setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopupWithForm.close();
        profileFormValidator.resetPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profilePopupWithForm.renderLoading(false);
      });
  }
);

// создает элемент карточки
const createCard = (data) => {
  const card = new Card(
    cardConf,
    data,
    userId,
    popupWithImage.open.bind(popupWithImage),
    (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setHandleSubmit(() => {
        popupWithConfirmation.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupWithConfirmation.renderLoading(false);
          });
      });
    },
    (cardId) => {
      api
        .setLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    },
    (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          card.updateLikes(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  );

  const cardElement = card.generateCard();

  return cardElement;
};

// функция клика по кнопке редактирования аватара
const handleAvatarButtonClick = () => {
  avatarFormValidator.resetPopup();
  avatarPopupWithForm.open();
};

// функция клика по кнопке редактирования профиля
const handleEditButtonClick = () => {
  const { name, about } = userInfo.getUserInfo();
  profileFormValidator.resetPopup();
  profileInputName.value = name;
  profileInputWork.value = about;
  profilePopupWithForm.open();
};

const handleAddButtonClick = () => {
  cardFormValidator.resetPopup();
  cardPopupWithForm.open();
};

// загрузка профиля и начальных карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// установка слушателей событий попапам
popupWithConfirmation.setEventListeners();
popupWithImage.setEventListeners();
avatarPopupWithForm.setEventListeners();
profilePopupWithForm.setEventListeners();
cardPopupWithForm.setEventListeners();

// установка слушателей
profileAvatarEdit.addEventListener("click", handleAvatarButtonClick);
profileEditButton.addEventListener("click", handleEditButtonClick);
profileAddButton.addEventListener("click", handleAddButtonClick);

// включение валидации
avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
