import React from "react";
import Header from "./Header";
import Card from "./Card";
//import avatar from "../images/avatar.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header isWrappable={true}>
        <p className="header__menu-item">{props.email}</p>
        <button href="#" className="header__menu-item" onClick={props.onLogout}>
          Выйти
        </button>
      </Header>

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
                  type="button"
                  className="profile__create link"
                  name="create-button"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__work">{currentUser.about}</p>
            </div>
            <button
              className="profile__avatar-create link"
              name="avatar-edit-button"
              onClick={props.onEditAvatar}
              type="button"
            ></button>
          </div>
          <button
            className="profile__add link"
            onClick={props.onAddPlace}
            type="button"
          ></button>
        </section>

        <section className="cards" aria-label="фото">
          {props.cards.map((card) => {
            return (
              <Card
                onCardDelete={props.onCardDelete}
                key={card._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                card={card}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
