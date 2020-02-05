import React from 'react';
import ReactDOM from 'react-dom';
import '__mocks__/AudioContext.mock';
import '__mocks__/crypto.mock';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/theme';

import { render, fireEvent, wait, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';

export const withTheme = (Component, props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withTheme(App), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('cycles bets', async () => {
  const { getByTestId } = render(withTheme(App));
  const betBtn = getByTestId('bet-button');
  const betDisplay = getByTestId('current-bet');

  expect(betDisplay).toHaveTextContent('$5');
  fireEvent.click(betBtn);
  await waitForDomChange(() => expect(betDisplay).toHaveTextContent('$10'));
  fireEvent.click(betBtn);
  await waitForDomChange(() => expect(betDisplay).toHaveTextContent('$15'));
  fireEvent.click(betBtn);
  await waitForDomChange(() => expect(betDisplay).toHaveTextContent('$20'));
  fireEvent.click(betBtn);
  await waitForDomChange(() => expect(betDisplay).toHaveTextContent('$25'));
  fireEvent.click(betBtn);
  await waitForDomChange(() => expect(betDisplay).toHaveTextContent('$5'));
});

it('sets max bet', async () => {
  const { getByTestId } = render(withTheme(App));
  const maxBetBtn = getByTestId('bet-max-button');
  const betDisplay = getByTestId('current-bet');

  expect(betDisplay).toHaveTextContent('$5');
  fireEvent.click(maxBetBtn);
  await wait(() => expect(betDisplay).toHaveTextContent('$25'));
});

it('plays a full hand', async () => {
  const { getByTestId, getAllByTestId, getByText, queryByText } = render(withTheme(App));
  const dealBtn = getByTestId('deal-button');
  const betBtn = getByTestId('bet-button');
  const betMaxBtn = getByTestId('bet-max-button');
  const betDisplay = getByTestId('current-bet');
  const bankDisplay = getByTestId('bank');
  const bet = betDisplay.textContent.slice(1);
  const bank = bankDisplay.textContent.slice(1);

  // 5 cards, face down
  const cards = getAllByTestId('card');
  expect(cards.length).toBe(5);
  cards.forEach(c => {
    expect(c.querySelector('span')).toHaveStyle('display: none');
  });

  // deal
  fireEvent.click(dealBtn);
  expect(dealBtn).toBeDisabled();
  // wait for cards to turn
  await wait(() => {
    cards.forEach(c => {
      expect(c.querySelector('span')).not.toHaveStyle('display: none');
    });
  });

  // deal is active again
  expect(dealBtn).not.toBeDisabled();
  expect(dealBtn).toHaveTextContent('Draw');
  // bets are disabled
  expect(betBtn).toBeDisabled();
  expect(betMaxBtn).toBeDisabled();

  // bet was deducted from bank
  await waitForDomChange(() => {
    expect(bankDisplay.textContent.slice(1)).toEqual(bank - bet);
  });

  // draw 5 more cards
  fireEvent.click(dealBtn);
  // draw is disabled while cards are turning
  expect(dealBtn).toBeDisabled();
  await wait(() => expect(dealBtn).not.toBeDisabled());

  await wait(() => getByText(/you win|game over/i));
  const win = queryByText(/you win/i);
  const noWin = queryByText(/game over/i);

  expect(win || noWin).toBeTruthy();
  if (win) {
    // bet is added to bank
    await waitForDomChange(() => {
      expect(bankDisplay.textContent.slice(1)).toEqual(bank);
    });
  } else {
    // now winnings
    await waitForDomChange(() => {
      expect(bankDisplay.textContent.slice(1)).toEqual(bank - bet);
    });
  }
});
