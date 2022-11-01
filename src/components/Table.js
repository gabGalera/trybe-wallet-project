import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import { deleteExpense } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { expenses } = store.getState().wallet;
    const { dispatch } = this.props;
    console.log(target.name);
    const newExpenses = expenses
      .filter((item) => Number(item.id) !== Number(target.name));
    console.log(newExpenses);
    dispatch(deleteExpense(newExpenses));
  };

  render() {
    const { expenses } = store.getState().wallet;
    return (
      <div id="blue-box">
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses[expenses.length - 1].exchangeRates ? (
              expenses.map((item) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{Number(item.value).toFixed(2)}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{Number(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      (item.exchangeRates[item.currency].ask * item.value).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      name={ item.id }
                      onClick={ this.deleteExpense }
                      type="button"
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))) : <tr />}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
