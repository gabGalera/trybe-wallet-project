import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div
        id="wallet-title-container"
        className={ styles.header__container }
      >
        <div
          className={ styles.logo }
          // id="title"
        />
        <div>
          <span
            className={ styles.total__expenses }
            id="total-expenses"
          >
            <div
              className={ styles.coins }
            />
            Total de despesas:
            {' '}
            <span
              className={ styles.total__field }
              data-testid="total-field"
            >
              {expenses.length > 0 ? (
                expenses
                  .map((data) => {
                    const askPrice = data.exchangeRates[data.currency].ask;
                    return (data.value * askPrice).toFixed(2);
                  })
                  .reduce((acc, curr) => (parseFloat(acc) + parseFloat(curr)).toFixed(2))
              ) : '0.00'}
            </span>
            <span
              className={ styles.total__field }
              data-testid="header-currency-field"
            >
              {' '}
              BRL
            </span>
          </span>
        </div>
        <div
          className={ styles.email__container }
          id="user-email"
          data-testid="email-field"
        >
          <div
            className={ styles.profile__image }
          />
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
