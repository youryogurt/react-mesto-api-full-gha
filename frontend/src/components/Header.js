import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ email, signOut}) {

  return (
    <header className="header">
      <a href="#">
        <img className="logo" src={logo} alt="Надпись Mesto Russia" />
      </a>
      <Routes>
        <Route path='/sign-in' element={<Link to="/sign-up" className="header__link">Регистрация </Link> } />
        <Route path='/sign-up' element={<Link to="/sign-in" className="header__link">Войти </Link> } />
        <Route path='/' element={<div className="header__container">
          <p className="header__email">{email}</p>
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выйти
          </Link>
        </div>} />
      </Routes>
    </header>
  );
}

export default Header;
