import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = (props) => {

  const handleCardClick = () => {
    props.onCardClick({link: props.card.link, name: props.card.name});
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleDeleteClick  = () => {
    props.onCardDelete(props.card._id);
  }
  const currentUser = React.useContext(CurrentUserContext);
  //  const isOwn = props.card.owner._id === currentUser._id;
  const isOwn = props.card.owner === currentUser._id;
  //  const isLikedByMe = props.card.likes.some(i => i._id === currentUser._id);
  const isLikedByMe = props.card.likes?.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `like-container__like ${isLikedByMe && 'like-container__like_enabled'}` 
  );

  return (
    <>
      {isOwn &&
      <button
        aria-label="удалить"
        className="element__trash element__trash_show"
        type="button"
        onClick={handleDeleteClick} 
      >
      </button>}
      <img
        className="element__place"
        src={props.card?.link}
        alt={props.card?.name}
        onClick={handleCardClick} 
      />
      <div className="element__title">
        <h2 className="element__caption">{props.card?.name}</h2>
        <div className="like-container">
          <button aria-label="лайк" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="like-container__count">{props.card.likes?.length ?? 0}</p>
        </div>
      </div>
    </>
  )
}

export default Card;