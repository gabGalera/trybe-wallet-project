import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../redux/store';
import { editExpense, deleteExpense } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { expenses } = store.getState().wallet;
    const { dispatch } = this.props;

    const newExpenses = expenses
      .filter((item) => Number(item.id) !== Number(target.name));
    console.log(newExpenses);
    dispatch(deleteExpense(newExpenses));
  };

  editMode = ({ target }) => {
    const { dispatch } = this.props;

    const addButton = document.getElementById('box-cinza').lastElementChild;
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar despesa';
    editButton.type = 'button';
    editButton.setAttribute('data-testid', 'edit-btn');
    editButton.addEventListener('click', () => {
      const { value } = document.getElementById('box-cinza').childNodes[0];
      const description = document.getElementById('box-cinza').childNodes[1].value;
      const submitCurrency = document.getElementById('box-cinza').childNodes[2].value;
      const submitMethod = document.getElementById('box-cinza').childNodes[3].value;
      const submitTag = document.getElementById('box-cinza').childNodes[4].value;

      const expenses = {
        submitCurrency,
        submitMethod,
        submitTag,
        value,
        description,
      };

      dispatch(editExpense(expenses, target.name));

      document.getElementById('box-cinza').childNodes[0].value = '';
      document.getElementById('box-cinza').childNodes[1].value = '';
      document.getElementById('box-cinza').childNodes[2].value = 'USD';
      document.getElementById('box-cinza').childNodes[3].value = 'Dinheiro';
      document.getElementById('box-cinza').childNodes[4].value = 'Alimentação';
      document.getElementById('box-cinza')
        .appendChild(addButton);
      document.getElementById('box-cinza')
        .removeChild(editButton);
    });

    document.getElementById('box-cinza')
      .removeChild(addButton);
    document.getElementById('box-cinza')
      .appendChild(editButton);
  };

  render() {
    const { expenses } = store.getState().wallet;
    return (
      <div id="blue-box">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
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
                      onClick={ this.editMode }
                      type="button"
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
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
