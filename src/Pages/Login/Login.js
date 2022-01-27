import React from 'react';

function Login() {
  // onChangeHandler = ({ name, value }) => {
  //   this.setState({
  //     [name]: value,
  //   }, () => { this.btnCheck(); });
  // };

  // btnCheck = () => {
  //   const regexValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  //   // Referência do Regex: https://regexr.com/3e48o
  //   const { playerName, playerEmail } = this.state;

  //   if (playerName.length !== 0 && regexValidation.test(playerEmail)) {
  //     this.setState({ btnDisabled: false });
  //   } else {
  //     this.setState({ btnDisabled: true });
  //   }
  // };

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
