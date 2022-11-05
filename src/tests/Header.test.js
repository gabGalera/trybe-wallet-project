import React from 'react';
import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um header para a página de carteira contendo as seguintes características', () => {
  test('Um elemento que exiba o e-mail da pessoa usuária que fez login', () => {
    renderWithRouterAndRedux(<Header />);

    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
    expect(screen.queryByText(/trybe/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).toBeInTheDocument();
  });

  test('Um elemento com a despesa total gerada pela lista de gastos', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const total = screen.getByTestId('total-field');
    expect(total.innerHTML).toBe('0.00');

    const inputValue = await screen.findByTestId('value-input');
    const button = await screen.findByRole('button', { name: /adicionar/i });

    userEvent.type(inputValue, '100');
    expect(inputValue).toHaveValue(100);
    userEvent.click(button);

    expect(inputValue.value).toBe('');

    const totalField = await screen.findByTestId('total-field');
    await waitFor(async () => expect(totalField.innerHTML).not.toMatch('0.00'))
      .then(async () => expect(totalField.innerHTML).not.toMatch('0.00'));
  });
  test('Um elemento que mostre qual câmbio está sendo utilizado, que neste caso será "BRL"', () => {
    renderWithRouterAndRedux(<Header />);

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency.innerHTML).toBe(' BRL');
  });

  test('Se o e-mail do usuário aparece', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'youShallPass@gmail.com');
    userEvent.type(passwordInput, '1234567');

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
    expect(screen.getByText('youShallPass@gmail.com')).toBeInTheDocument();
  });
});
