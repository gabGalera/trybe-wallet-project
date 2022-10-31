import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';

class Header extends Component {
  render() {
    const { user: { email } } = store.getState();
    console.log(email);
    return (
      <div id="wallet-title-container">
        <div>
          <h1 id="title">
            Trybe Wallet
          </h1>
        </div>
        <p>
          <span id="total-expenses">
            Total de despesas:
            {' '}
            <span data-testid="total-field">0 </span>
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </p>
        <div id="user-email" data-testid="email-field">
          {`${email}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
