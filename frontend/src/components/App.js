import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../utils/api.js";
import { React, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as mestoAuth from '../utils/mestoAuth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopup(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик сабмита формы редактирования профиля
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //обработчик сабмита формы изменения аватара
  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // обработчик регистрации
  function handleRegister(email, password) {
    mestoAuth.register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // обработчик входа
  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    mestoAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // обработчик выхода
  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  // проверка токена
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    mestoAuth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onSignOut={signOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  email={email}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleLogin} />}
            />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          </Routes>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onCardClick={handleCardClick}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
