import React from 'react';
import { screen, waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
// import Wallet from '../pages/Wallet';
import App from '../App';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um header para a página de carteira contendo as seguintes características', () => {
  test('Um elemento que exiba o e-mail da pessoa usuária que fez login', () => {
    renderWithRouterAndRedux(<Header />);

    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
  });

  test.only('Um elemento com a despesa total gerada pela lista de gastos', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const INITIAL_STATE = {
      currencies: [], // array de string
      expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    };

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    // await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    // const total = screen.getByTestId('total-field');
    // expect(total.innerHTML).toBe('0.00');

    // const inputValue = await screen.findByTestId('value-input');
    // const button = await screen.findByRole('button', { name: /adicionar/i });

    // userEvent.type(inputValue, '100');
    // expect(inputValue).toHaveValue(100);
    // userEvent.click(button);

    // expect(global.fetch).toHaveBeenCalledTimes(2);
    // expect(inputValue.value).toBe('');

    // console.log(store.getState());
    // expect((await screen.findByTestId('total-field')).innerHTML).not.toMatch('0.00');

    // console.log(total.innerHTML);
  });
  test('Um elemento que mostre qual câmbio está sendo utilizado, que neste caso será "BRL"', () => {
    renderWithRouterAndRedux(<Header />);

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency.innerHTML).toBe(' BRL');
  });
});
