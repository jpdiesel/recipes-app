import React, { useState } from 'react';

function Login() {
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

  return (
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
          type="submit"
          data-testid="login-submit-btn"
          disabled={ btnCheck() }
          // onClick={ onClickHandler }
        >
          Enter
        </button>
      </label>
    </form>
  );
}

export default Login;
