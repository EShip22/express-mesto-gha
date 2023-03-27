import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) => {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [currentUser, props.isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  } 

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      children={
        <>
          <input className="popup__input popup__input_field_name" id="name-input"
            type="text" placeholder="Имя" name="name" required minLength="2" maxLength="40"
            onChange={handleChangeName} value={name}/>
          <p className="popup__input-error" id="name-input-error"></p>
          <input className="popup__input popup__input_field_activity-category"
            type="text" placeholder="Вид деятельности" id="activity-input" name="description"
            required minLength="2" maxLength="200" onChange={handleChangeDescription} value={description}/>
          <p className="popup__input-error" id="activity-input-error"></p>
        </>
      }
      btnName="Сохранить"
      isOpen = {props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditProfilePopup;