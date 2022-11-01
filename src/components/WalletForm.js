import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import { fetchCurrenciesName, addExpense, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: true,
      submitCurrency: 'USD',
      submitMethod: 'Dinheiro',
      submitTag: 'Alimentação',
      value: '',
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

  render() {
    const { isFetching, value, description, submitCurrency,
      submitMethod,
      submitTag } = this.state;
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
          type="select"
          data-testid="currency-input"
          name="submitCurrency"
          value={ submitCurrency }
          onClick={ this.handleChange }
          onChange={ this.handleChange }
        >
          {currenciesName
            .map((currency) => (
              <option key={ currency } value={ currency }>{currency}</option>
            ))}
        </select>
        <select
          data-testid="method-input"
          name="submitMethod"
          value={ submitMethod }
          onClick={ this.handleChange }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="submitTag"
          value={ submitMethod }
          onClick={ this.handleChange }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => {
            const expenses = {
              submitCurrency,
              submitMethod,
              submitTag,
              value,
              description,
            };
            this.setState({
              value: '',
              description: '',
            });
            dispatch(addExpense(expenses));
            dispatch(fetchCurrencies());
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
