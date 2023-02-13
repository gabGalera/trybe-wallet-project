import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, deleteExpense } from '../redux/actions/index';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { expenses } = this.props;
    const { dispatch } = this.props;

    const newExpenses = expenses
      .filter((item) => Number(item.id) !== Number(target.name));
    console.log(newExpenses);
    dispatch(deleteExpense(newExpenses));
  };

  editMode = ({ target }) => {
    const { dispatch } = this.props;
    const secondDiv = 'second-div';

    const addButton = document.getElementById('box-cinza').lastElementChild;
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar despesa';
    editButton.type = 'button';
    editButton.setAttribute('data-testid', 'edit-btn');
    editButton.addEventListener('click', () => {
      const description = document.getElementById('first-div').childNodes[0].value;
      const submitTag = document.getElementById('first-div').childNodes[1].value;
      const { value } = document.getElementById(secondDiv).childNodes[0];
      const submitCurrency = document.getElementById(secondDiv).childNodes[1].value;
      const submitMethod = document.getElementById(secondDiv).childNodes[2].value;

      const expenses = {
        submitCurrency,
        submitMethod,
        submitTag,
        value,
        description,
      };

      dispatch(editExpense(expenses, target.name));

      document.getElementById('first-div').childNodes[0].value = '';
      document.getElementById(secondDiv).childNodes[0].value = 0;
      document.getElementById(secondDiv).childNodes[1].value = 'USD';
      document.getElementById(secondDiv).childNodes[2].value = 'Dinheiro';
      document.getElementById('first-div').childNodes[1].value = 'Alimentação';
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
    const { expenses } = this.props;
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
  expenses: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
