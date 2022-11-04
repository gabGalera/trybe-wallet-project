import { screen } from '@testing-library/react';
// import Table from '../components/Table';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  test('O botão deve ser o último item da linha da tabela e deve possuir o atributo data-testid="delete-btn"', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const INITIAL_STATE = {
      currencies: [], // array de string
      expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
      editor: false, // valor booleano que indica de uma despesa está sendo editada
      idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    };

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await waitForElementToBeRemoved(screen.queryByRole('heading', { level: 1, name: /loading/i }));
    const total = screen.getByTestId('total-field');
    expect(total.innerHTML).toBe('0.00');

    const inputValue = await screen.findByTestId('value-input');
    const button = await screen.findByRole('button', { name: /adicionar/i });

    userEvent.type(inputValue, '100');
    act(() => {
      userEvent.click(button);
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(inputValue.value).toBe('');
  });
});
