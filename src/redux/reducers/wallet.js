import {
  RECEIVED_CURRENCIES_NAME, REQUEST_CURRENCIES, SUBMIT_EXPENSES } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return state;
  case RECEIVED_CURRENCIES_NAME:
    return {
      ...state,
      currencies: Object.values(action.currencies)
        .filter((currency) => currency.codein !== 'BRLT')
        .map((code) => code.code),
    };
  case SUBMIT_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          value: action.expenses.value,
          description: action.expenses.description,
          currency: action.expenses.submitCurrency,
          method: action.expenses.submitMethod,
          tag: action.expenses.submitTag,
          exchangeRates: action.expenses.exchangeRates }],
    };
  default:
    return state;
  }
};

export default wallet;
