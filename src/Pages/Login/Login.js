import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const btnCheck = () => {
    const regexValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // Referência do Regex: https://regexr.com/3e48o
    const minSenha = 7;

    if (senha.length >= minSenha && regexValidation.test(email)) {
      return false;
    } return true;
  };

  const onButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <div className="login">
      <form>
        <label htmlFor="email-login">
          E-mail:
          <input
            type="text"
            id="email-login"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="email-login">
          Senha:
          <input
            type="password"
            id="senha-login"
            name="senha"
            data-testid="password-input"
            value={ senha }
            onChange={ ({ target }) => setSenha(target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ btnCheck() }
            onClick={ () => onButton() }
          >
            Enter
          </button>
        </label>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
