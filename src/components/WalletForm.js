import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesName, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      submitCurrency: 'USD',
      submitMethod: 'Dinheiro',
      submitTag: 'Alimentação',
      value: '',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesName());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { value, description, submitCurrency,
      submitMethod,
      submitTag } = this.state;
    const { dispatch } = this.props;
    const { currencies } = this.props;

    if (currencies.length === 0) return <h1>Loading...</h1>;

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
          {currencies
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
          value={ submitTag }
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
          className="add-button"
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
              submitCurrency: 'USD',
              submitMethod: 'Dinheiro',
              submitTag: 'Alimentação',
            });
            dispatch(fetchCurrencies(expenses));
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
  currencies: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
