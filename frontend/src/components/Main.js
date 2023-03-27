import React, { useEffect } from "react";
import Card from './Card.js'; 
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';

const Main = (props) => {

  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}}></div>
        <div onClick={props.onEditAvatar} className="profile__avatar profile__avatar_overlay"></div>
        <div className="profile-info">
          <h1 className="profile-info__header">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} aria-label="редактировать" className="profile-info__edit-button" type="button"></button>
          <p className="profile-info__description">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} aria-label="добавить" className="profile__add-button" type="button"></button>
      </section>
      <section className="elements">
        {
          cards?.map((elem, i) => {
            return (
              <div className="element" key={elem._id}>
                <Card card={elem} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
              </div>
            )
          })
        }
      </section>
    </main>
  );
}

export default Main;