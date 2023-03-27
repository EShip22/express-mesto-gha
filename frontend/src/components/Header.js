import logo from "../images/mesto.svg";

const Header = (props) => {
  return (
    <header className="header">
      <img className="header__logo" alt="место" src={logo}/>
      <div className="login-container">
        <p className="header__email">{props.isLogin ? props.email : ""}</p>
        <>
          {props.children}
        </>
      </div>
    </header>
  )
}

export default Header;