import React from "react";
import api from "../utils/api";
import Card from "./Card";
import blackBackgroundPath from "../images/avatar.png";

function Main(props) {
  const [userName, setUserName] = React.useState("...");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState(blackBackgroundPath);
  const [userId, setUserId] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setUserId(data.userId);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={userAvatar}
            alt="аватар профиля"
            className="profile__avatar-image"
          />

          <div className="profile__section">
            <div className="profile__name-container">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                className="profile__create link"
                name="create-button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <p className="profile__work">{userDescription}</p>
          </div>
          <button
            type="button"
            className="profile__avatar-create link"
            name="avatar-edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add link"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards" aria-label="фото">
        <ul className="cards">
          {cards.map((cardData, index) => {
            return (
              <Card
                key={index}
                userId={userId}
                onCardClick={props.onCardClick}
                {...cardData}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
