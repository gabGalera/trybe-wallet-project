import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  test('O botão deve ser o último item da linha da tabela e deve possuir o atributo data-testid="delete-btn"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const total = screen.getByTestId('total-field');
    expect(total.innerHTML).toBe('0.00');

    const inputValue = await screen.findByTestId('value-input');
    const inputDescription = await screen.findByTestId('description-input');
    const button = await screen.findByRole('button', { name: /adicionar/i });
    const method = await screen.findByTestId('method-input');
    const tag = await screen.findByTestId('tag-input');
    const currencies = await screen.findByTestId('currency-input');

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'Ovos');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Alimentação');
    userEvent.selectOptions(currencies, 'CAD');

    userEvent.click(button);

    // expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(inputValue.value).toBe('');
    expect(inputDescription.value).toBe('');

    const text = await screen.findByText(/ovos/i);
    const value = await screen.findByText(/100/);
    const tipoMoeda = await screen.findByText(/canadense/i);
    const deleteButton = await screen.findByRole('button', { name: /excluir/i });
    expect(deleteButton).toBeInTheDocument();
    expect(tipoMoeda).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
    expect(tipoMoeda).not.toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
    expect(value).not.toBeInTheDocument();
  });

  test('O botão deve ser o último item da linha da tabela e deve possuir o atributo data-testid="edit-btn"', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const total = screen.getByTestId('total-field');
    expect(total.innerHTML).toBe('0.00');

    const inputValue = await screen.findByTestId('value-input');
    const inputDescription = await screen.findByTestId('description-input');
    const button = await screen.findByRole('button', { name: /adicionar/i });
    const method = await screen.findByTestId('method-input');
    const tag = await screen.findByTestId('tag-input');
    const currencies = await screen.findByTestId('currency-input');

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'Ovos');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Alimentação');
    userEvent.selectOptions(currencies, 'CAD');

    userEvent.click(button);

    // expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(inputValue.value).toBe('');
    expect(inputDescription.value).toBe('');

    const text = await screen.findByText(/ovos/i);
    const value = await screen.findByText(/100/);
    const tipoMoeda = await screen.findByText(/canadense/i);
    const editButton = await screen.findByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();
    expect(tipoMoeda).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(value).toBeInTheDocument();

    userEvent.click(editButton);

    const editarExpense = await screen.findAllByTestId('edit-btn');
    expect(editarExpense[0]).toBeInTheDocument();

    userEvent.type(inputValue, '200');
    userEvent.type(inputDescription, 'Potatoes');
    userEvent.selectOptions(method, 'Cartão de crédito');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.selectOptions(currencies, 'USD');
    userEvent.click(editarExpense[0]);
  });
});
