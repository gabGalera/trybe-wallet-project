import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  RECEIVED_CURRENCIES,
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
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.expenses.value,
        description: action.expenses.description,
        currency: action.expenses.submitCurrency,
        method: action.expenses.submitMethod,
        tag: action.expenses.submitTag,
      }],
    };
  case RECEIVED_CURRENCIES:
    state.expenses[state.expenses.length - 1].exchangeRates = action.currencies;
    return {
      ...state,
      expenses: [...state.expenses],
    };
  case DELETE_EXPENSE:
    // action.newExpenses.forEach((item, index) => {
    //   item.id = index;
    // });
    return {
      ...state,
      expenses: [...action.newExpenses],
    };
  case EDIT_EXPENSE:
    state.expenses[action.id].value = action.newExpenses.value;
    state.expenses[action.id].description = action.newExpenses.description;
    state.expenses[action.id].currency = action.newExpenses.submitCurrency;
    state.expenses[action.id].method = action.newExpenses.submitMethod;
    state.expenses[action.id].tag = action.newExpenses.submitTag;
    console.log(state);
    return {
      ...state,
      expenses: [...state.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
