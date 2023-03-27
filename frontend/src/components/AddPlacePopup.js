import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [props.isOpen]);

  const handleChangeCardName = (e) => {
    setCardName(e.target.value);
  }

  const handleChangeCardLink = (e) => {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardName, cardLink);
  }

  return(
    <PopupWithForm
      title="Новое место"
      name="add-card"
      children={
        <>
          <input className="popup__input" id="caption-input" type="text" placeholder="Название" name="fieldCaption"
            required minLength="2" maxLength="30" onChange={handleChangeCardName} value={cardName}/>
          <p className="popup__input-error" id="caption-input-error"></p>
          <input className="popup__input" id="link-input" type="url" placeholder="Ссылка на картинку" name="fieldLink" 
            onChange={handleChangeCardLink} required value={cardLink}/>
          <p className="popup__input-error" id="link-input-error"></p>
        </>
      }
      btnName="Создать"
      isOpen = {props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default AddPlacePopup;