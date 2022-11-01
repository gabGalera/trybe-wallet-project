import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';

class Table extends Component {
  render() {
    const { expenses } = store.getState().wallet;
    console.log(expenses);
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
                  <td />
                </tr>
              ))) : <tr />}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
