import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {

  let avatar = React.useRef();

  React.useEffect(() => {
    avatar.current.value=""
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar : avatar.current.value 
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      children={
        <>
          <input className="popup__input popup__input_field_avatar-link" id="avatar-link-input"
            type="url" placeholder="Ссылка на аватар" name="avatarLink"  required ref={avatar} />
          <p className="popup__input-error popup__input-error_solo" id="avatar-link-input-error"></p>
        </>
      }
      btnName="Сохранить"
      isOpen = {props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup;