import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div id="main-container">
        <div id="title-container">
          <div />
          <h1>Trybe Wallet</h1>
        </div>
        <form>
          <input id="email-input" type="email" placeholder="E-mail" />
          <input id="password-input" type="password" placeholder="Senha" />
          <button type="button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
