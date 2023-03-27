const PopupWithForm = (props) => {

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="закрыть" className={`popup__close popup__close_type_${props.name}`} type="button" onClick={props.onClose}></button>
        <form className={`popup__form popup__form_type_${props.name}`} name={`${props.name}-form`} onSubmit={props.onSubmit}>
          <h2 className="popup__header">{props.title}</h2>
          {props.children}
          <input className={`popup__save popup__save-${props.name}`} type="submit" value={props.btnName}/>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;