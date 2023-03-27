const ImagePopup = (props) => {
  return (
    <div className={`popup popup_show-image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container-for-img">
        <button aria-label="закрыть" className="popup__close popup__close_img" type="button" onClick={props.onClose}></button>
        <img className="popup__img" src={props.card?.link ?? "#"} alt={props.card?.name ?? ""}/>
        <p className="popup__text">{props.card?.name ?? ""}</p>
      </div>
    </div>
  )
}

export default ImagePopup;