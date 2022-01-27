import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email-login">
        E-mail:
        <input
          type="text"
          id="email-login"
          name="Email"
          data-testid="email-input"
          // value={ playerEmail }
        />
      </label>
      <label htmlFor="email-login">
        Senha:
        <input
          type="text"
          id="senha-login"
          name="Senha"
          data-testid="password-input"
          // value={ playerEmail }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          // disabled={ btnDisabled }
          // onClick={ onClickHandler }
        >
          Enter
        </button>
      </label>
    </form>
  );
}

export default Login;
