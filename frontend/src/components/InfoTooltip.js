import errImage from "../images/RegistrErr.png";
import okImage from "../images/RegistrOk.png";

export const InfoTooltip = (props) => {
  return (
    <div className={`popup popup_show-image ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container-for-img popup__container-for-img_auth">
        <button aria-label="закрыть" className="popup__close popup__close_img" type="button" onClick={props.onClose}></button>
        <img className="popup__container-for-img_img" src={props.status === "ok" ? okImage : errImage} alt="" />
        <p className="popup__text_auth">{props.text}</p>
      </div>
    </div>
  )
}