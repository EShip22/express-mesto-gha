import React from "react";
import {useNavigate} from "react-router-dom"; 

export const Login = (props) => {

  const [formEmail, setFormEmail] = React.useState("");
  const [formPassword, setFormPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setFormEmail(e.target.value);
  }
  const handleChangePassword = (e) => {
    setFormPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin({
      email: formEmail,
      password: formPassword
    })
  }

  return(
    <div className="auth-container">
      <form
        className={`auth-container__form `}
        name={`${props.name}-form`}
        onSubmit={handleSubmit}>
        <h2 className="auth-container__header">Вход</h2>
        <input className="auth-container__input auth-container__input_field_email" id="email-input"
          type="text" placeholder="Email" name="email" required minLength="2" maxLength="40"
          onChange={handleChangeEmail} value={formEmail}/>
        <input className="auth-container__input auth-container__input_field_password"
          type="password" placeholder="Пароль" id="password-input" name="password"
          required onChange={handleChangePassword} value={formPassword}/>
        <input className={`auth-container__save`} type="submit" value="Войти" />
      </form>
    </div>
  )
}