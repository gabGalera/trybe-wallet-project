import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div id="wallet-title-container">
        <div>
          <h1 id="title">
            Trybe Wallet
          </h1>
        </div>
        <div>
          <span id="total-expenses">
            Total de despesas:
            {' '}
            <span data-testid="total-field">
              {expenses.length > 0 ? (
                expenses
                  .map((data) => {
                    const askPrice = data.exchangeRates[data.currency].ask;
                    return (data.value * askPrice).toFixed(2);
                  })
                  .reduce((acc, curr) => (parseFloat(acc) + parseFloat(curr)).toFixed(2))
              ) : '0.00'}
            </span>
            <span data-testid="header-currency-field">
              {' '}
              BRL
            </span>
          </span>
        </div>
        <div id="user-email" data-testid="email-field">
          {`${email}`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Header);
