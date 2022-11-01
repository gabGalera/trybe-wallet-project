import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um header para a página de carteira contendo as seguintes características', () => {
  test('Um elemento que exiba o e-mail da pessoa usuária que fez login', () => {
    renderWithRouterAndRedux(<Header />);

    expect(screen.queryByTestId('email-field')).toBeInTheDocument();
  });
  test('Um elemento com a despesa total gerada pela lista de gastos', () => {
    renderWithRouterAndRedux(<Header />);

    const total = screen.getByTestId('total-field');
    console.log(total);
    expect(total.innerHTML).toBe('0');
  });
  test('Um elemento que mostre qual câmbio está sendo utilizado, que neste caso será "BRL"', () => {
    renderWithRouterAndRedux(<Header />);

    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency.innerHTML).toBe(' BRL');
  });
});
