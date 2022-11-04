// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const RECEIVED_CURRENCIES_NAME = 'RECEIVED_CURRENCIES_NAME';

export const receiveCurrenciesName = (currencies) => ({
  type: RECEIVED_CURRENCIES_NAME,
  currencies,
});

export function fetchCurrenciesName() {
  return async (dispatch) => {
    dispatch(requestCurrencies());

    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const JSON = await fetchAPI.json();
    dispatch(receiveCurrenciesName(JSON));
  };
}

export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';

// export const receiveCurrencies = (currencies) => ({
//   type: RECEIVED_CURRENCIES,
//   currencies,
// });

export const SUBMIT_EXPENSES = 'SUBMIT_EXPENSES';

export const addExpense = (
  expenses,
  currencies,
) => ({
  type: SUBMIT_EXPENSES,
  expenses,
  currencies,
});

export function fetchCurrencies(expenses) {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((respones) => respones.json())
      .then((data) => dispatch(addExpense(expenses, data)));
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (newExpenses) => ({
  type: DELETE_EXPENSE,
  newExpenses,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (newExpenses, id) => ({
  type: EDIT_EXPENSE,
  newExpenses,
  id,
});
