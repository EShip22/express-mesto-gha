import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CardsContext} from '../contexts/CardsContext';
import {Routes, Route, Navigate, useNavigate, Link} from 'react-router-dom'; 
import {Login} from './Login';
import {Register} from './Register';
import {InfoTooltip} from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

document.body.style.backgroundColor = "#000000";

const  App = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [authResponseStatus, setAuthResponseStatus] = React.useState("");
  const [infoTooltipText, setInfoTooltipText] = React.useState("");

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  

  React.useEffect(() => {
    if (isLogin) {
      api.getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(err))
    }
  }, [isLogin]);

  const handleAddPlaceSubmit = (cardName, cardLink) => {
    api.addCard(cardName, cardLink)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getContent(jwt)
        .then((res)=> {
          if(res) {
            setIsLogin(true);
            setUserEmail(res.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i/*._id*/ === currentUser._id);
    
    if (isLiked) {
      api.delLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    }
  }

  const handleCardDelete = (id) => {
    api.delCardQuery(id)
      .then((res) => {
        setCards((prevState) => {
          return prevState.filter(card => card._id !== id )
        });
      })
      .catch((err) => console.log(err))
  } 

  const handleUpdateUser = (props) => {
    api.setUserInfo({name: props.name, description: props.about})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = (props) => {
    api.setUserAvatar(props.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleRegistration = (props) => {
    api.register(props)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setAuthResponseStatus("ok");
        setInfoTooltipText("Вы успешно зарегистрированы");
      })
      .catch((err) => {
        setAuthResponseStatus("error");
        setIsInfoTooltipOpen(true);
        setInfoTooltipText("Ошибка регистрации: " + err);
      })
  }

  const handleLogin = (props) => {
    api.authorization(props)
      .then((res) => {
        if (res._id) {
          localStorage.setItem('jwt', res._id);
        }
        setIsLogin(true);
        setUserEmail(props.email);
        navigate('/');
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoTooltipText("Ошибка входа в систему: " + err);
      })
  }

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('jwt');
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    if(isInfoTooltipOpen && authResponseStatus==="ok") {
      navigate("/sign-in");
    }
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    if(isLogin) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err))
    }
  }, [isLogin]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={
                    function page() {
                      return (
                        <>
                          <Header
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                            email={userEmail}
                            onLogout={handleLogout}
                            children={<Link className="header__welcome" onClick={handleLogout} to="/sign-in">Выйти</Link>}
                          />
                          <Main
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={setSelectedCard}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                          />
                          <Footer/>
                          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
                          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                          <PopupWithForm
                            title="Вы уверены?"
                            name="del-card"
                            btnName="Да"
                          />
                          <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
                        </>
                      )}
                    }
                  loggedIn = {isLogin}
                />
              }
            />
            <Route
              path={"/sign-up"}
              element={
                <>
                  <Header
                    isLogin={isLogin}
                    email={userEmail}
                    children={<Link className="header__welcome" to="/sign-in">Войти</Link>}
                  />
                  <Register onRegister={handleRegistration}/>
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    status={authResponseStatus}
                    text={infoTooltipText}
                  />
                </>
              }
            />
            <Route
              path={"/sign-in"}
              element={
                <>
                  <Header
                    isLogin={isLogin}
                    email={userEmail}
                    children={<Link className="header__welcome" to="/sign-up">Регистрация</Link>}
                  />
                  <Login 
                    isLogin={isLogin}
                    setUserEmail={setUserEmail}
                    setIsLogin={setIsLogin}
                    onLogin={handleLogin}
                  />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    status={authResponseStatus}
                    text={infoTooltipText}
                  />
                </>
              }
            />
            <Route
              path="*"
              element={
                isLogin ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-in" />
                )
              }
            />
          </Routes>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;