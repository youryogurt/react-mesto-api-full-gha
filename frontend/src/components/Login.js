import React, { useState } from 'react';

function Login({ onLogin }){
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
    onLogin(email, password);
  }

  return (
    <form className="auth__form" name="login" onSubmit={handleSubmit}>
      <h2 className="auth__title">Вход</h2>
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
        Войти
      </button>
    </form>
  );
}

export default Login;