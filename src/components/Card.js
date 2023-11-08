import React from 'react';

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props);
  }

  return (
    <li className="cards__card">
      <img className="cards__img link" src={props.link} alt="Изображение из карточки" onClick={handleCardClick} />
      {(props.userId === props.owner._id) ? (<button className="cards__basket link" type="button"></button>) : ''}
      <div className="cards__container">
        <h2 className="cards__title">{props.name}</h2>
        <div className="cards__like-container">
          <button className="cards__like-icon link" type="button"></button>
          <span className="cards__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
