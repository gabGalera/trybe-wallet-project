import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import { fetchCurrenciesName, submitExpenses } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: true,
      submitCurrency: '',
      submitMethod: '',
      submitTag: '',
      value: 0,
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesName())
      .then(() => {
        this.setState({
          isFetching: false,
        });
      });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  fetchCurrencies() {
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => currencies);
  }

  render() {
    const { isFetching, value, description } = this.state;
    const { dispatch } = this.props;
    const currenciesName = store.getState().wallet.currencies;
    if (isFetching) return <h1>Loading...</h1>;

    return (
      <form id="box-cinza">
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="textarea"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="submitCurrency"
          onClick={ this.handleChange }
        >
          {currenciesName
            .map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
        </select>
        <select
          data-testid="method-input"
          name="submitMethod"
          onClick={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="submitTag"
          onClick={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => {
            const {
              submitCurrency,
              submitMethod,
              submitTag,
            } = this.state;
            this.fetchCurrencies()
              .then((exchangeRates) => {
                const expenses = { submitCurrency,
                  submitMethod,
                  submitTag,
                  value,
                  description,
                  exchangeRates };
                this.setState({
                  value: 0,
                  description: '',
                });
                dispatch(submitExpenses(expenses));
              });
          } }
        >
          Adicionar despesa

        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
