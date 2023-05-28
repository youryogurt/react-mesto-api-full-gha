import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className="auth__form" name="register" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <label className="auth__label">
        <input
          className="auth__text"
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChangeEmail}
        />
      </label>
      <label className="auth__label">
        <input
          className="auth__text"
          id="password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handleChangePassword}
        />
      </label>
      <button className="auth__button button" type="submit">
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;