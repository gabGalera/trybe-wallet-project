import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  afterEach(() => jest.clearAllMocks());
  test('Um campo para adicionar valor da despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    expect(await screen.findByTestId('value-input')).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    expect(await screen.findByTestId('description-input')).toBeInTheDocument();
  });
  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    renderWithRouterAndRedux(
      <WalletForm />,
    );

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const currencies = await screen.findByTestId('currency-input');

    userEvent.selectOptions(currencies, 'CAD');

    expect(currencies).toHaveAttribute('type', 'select');
    expect(currencies.childNodes.length).toBe(15);
  });

  test('Um campo para adicionar qual método de pagamento será utilizado', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const method = await screen.findByTestId('method-input');
    expect(method).toBeInTheDocument();
    userEvent.selectOptions(method, 'Dinheiro');
    expect(method).toHaveValue('Dinheiro');

    userEvent.selectOptions(method, 'Cartão de crédito');
    expect(method).toHaveValue('Cartão de crédito');

    userEvent.selectOptions(method, 'Cartão de débito');
    expect(method).toHaveValue('Cartão de débito');
  });

  test('Um campo para selecionar uma categoria (tag) para a despesa', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const tag = await screen.findByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    userEvent.selectOptions(tag, 'Alimentação');
    expect(tag).toHaveValue('Alimentação');

    userEvent.selectOptions(tag, 'Lazer');
    expect(tag).toHaveValue('Lazer');

    userEvent.selectOptions(tag, 'Trabalho');
    expect(tag).toHaveValue('Trabalho');

    userEvent.selectOptions(tag, 'Transporte');
    expect(tag).toHaveValue('Transporte');

    userEvent.selectOptions(tag, 'Saúde');
    expect(tag).toHaveValue('Saúde');
  });

  test('Se o botão apaga os inputs', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const value = await screen.findByTestId('value-input');
    const description = await screen.findByTestId('description-input');
    const currencies = await screen.findByTestId('currency-input');
    const method = await screen.findByTestId('method-input');
    const tag = await screen.findByTestId('tag-input');

    userEvent.type(value, '100');
    userEvent.type(description, 'Ovos');
    userEvent.selectOptions(currencies, 'CAD');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');

    const button = await screen.findByRole('button', { name: /adicionar/i });
    userEvent.click(button);
    expect(value).toHaveValue(null);
    expect(description).toHaveValue('');
    expect(currencies).toHaveValue('USD');
    expect(method).toHaveValue('Dinheiro');
    expect(tag).toHaveValue('Alimentação');
  });
});
