import { screen } from '@testing-library/react';
import WalletForm from '../components/WalletForm';
// import { fetchCurrenciesName } from '../redux/actions';
// import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  test('Um campo para adicionar valor da despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    expect(screen.queryByRole('heading', { level: 1, name: /loading/i })).toBeInTheDocument();
    expect(await screen.findByTestId('value-input')).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    expect(await screen.findByTestId('description-input')).toBeInTheDocument();
  });
  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    // global.fetch = jest.fn(() => Promise.resolve());

    renderWithRouterAndRedux(<WalletForm />);

    const currencies = await screen.findByTestId('currency-input');
    expect(currencies).toBeInTheDocument();
    console.log(currencies);
    expect(currencies).toHaveAttribute('type', 'select');
  });
  test.todo('Um campo para adicionar qual método de pagamento será utilizado');
  test.todo('Um campo para selecionar uma categoria (tag) para a despesa');
});
