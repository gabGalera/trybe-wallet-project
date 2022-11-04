// import { screen } from '@testing-library/react';
import Table from '../components/Table';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  test('O botão deve ser o último item da linha da tabela e deve possuir o atributo data-testid="delete-btn"', () => {
    renderWithRouterAndRedux(<Table />);
  });
});
