import React from 'react';

class Wallet extends React.Component {
  render() {
    // const { user } = this.props;
    // console.log(user);
    return (
      <div id="wallet-title-container">
        <div>
          <h1 id="title">
            Trybe Wallet
          </h1>
        </div>
        <p>
          <span id="total-expenses">Total de despesas:</span>
        </p>
        <div id="user-email">
          Email
        </div>
      </div>
    );
  }
}

export default Wallet;
