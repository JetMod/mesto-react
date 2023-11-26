import React from "react";
import api from "../utils/api";
import Card from "./Card";
//import avatar from "../images/avatar.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="аватар профиля"
          />

          <div className="profile__section">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__avatar-create link"
                name="avatar-edit-button"
                onClick={props.onEditAvatar}
                type="button"
              ></button>
            </div>
            <p className="profile__work">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__create link"
            name="create-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add link"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>

      <section className="cards" aria-label="фото">
        {props.cards.map((cardData) => {
          return (
            <Card
              key={cardData._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              {...cardData}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
