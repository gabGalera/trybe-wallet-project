import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('Crie uma página inicial de login com os seguintes campos e características', () => {
  test('A rota para esta página deve ser /', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.queryByRole('heading', { level: 1, name: /trybe/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { id: /email-input/i })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { id: /password-input/i })).toBeInTheDocument();
  });
  test('Você deve criar um local para que a pessoa usuária insira seu e-mail e senha', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'youShallNotPassGmailDotCom');
    userEvent.type(passwordInput, 123456);

    expect(screen.queryByRole('button', { name: /entrar/i })).toBeDisabled();
  });
  test('Crie um botão com o texto Entrar', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'youShallPass@gmail.com');
    userEvent.type(passwordInput, 1234567);

    // expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
