import React from 'react';
import '__mocks__/AudioContext.mock';
import '__mocks__/crypto.mock';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/theme';
import {
  render,
  fireEvent,
  wait,
  waitForDomChange,
  cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Game from 'components/Game';
import config from 'config';
import { scoreHand } from 'poker';

export const withTheme = (Component, props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

const gameProps = {
  playerState: config.initPlayerState,
  playerActions: {
    toggleSoundMute: () => {},
    incrementBank: points => (gameProps.playerState.bank += points)
  }
};

afterEach(cleanup);

it('renders without crashing', () => {
  render(withTheme(Game, gameProps));
});

it('cycles bets', async () => {
  const { getByTitle } = render(withTheme(Game, gameProps));
  const betBtn = getByTitle(/bet one/i);
  const betDisplay = getByTitle(/current bet is \$/i);

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
  const { getByTitle } = render(withTheme(Game, gameProps));
  const maxBetBtn = getByTitle(/bet max/i);
  const betDisplay = getByTitle(/current bet is \$/i);

  expect(betDisplay).toHaveTextContent('$5');
  fireEvent.click(maxBetBtn);
  await wait(() => expect(betDisplay).toHaveTextContent('$25'));
});

const getCardValue = cardEl => {
  const rank = cardEl.querySelector('span').textContent;
  const suit = cardEl
    .querySelector('svg')
    .innerHTML.slice(0, 1)
    .toUpperCase();
  return rank + suit;
};

it('plays a full hand', async () => {
  const { getAllByTestId, queryByText, getByTitle } = render(withTheme(Game, gameProps));
  const dealBtn = getByTitle(/deal a hand/i);
  const betBtn = getByTitle(/bet one/i);
  const betMaxBtn = getByTitle(/bet max/i);
  const betDisplay = getByTitle(/current bet is \$/i);
  const bankDisplay = getByTitle(/bank is \$/i);
  const bet = betDisplay.textContent.slice(1);
  const bank = bankDisplay.textContent.slice(1);

  // 5 cards, face down
  let cards = getAllByTestId('card');
  const cardValues = cards.map(getCardValue);
  expect(cards.length).toBe(5);
  cards.forEach(c => {
    expect(c).not.toHaveStyle('transform: rotateY(180deg)');
  });

  // deal
  fireEvent.click(dealBtn);
  expect(dealBtn).toBeDisabled();

  // wait for cards to turn
  await wait(() => {
    cards.forEach(c => {
      expect(c).toHaveStyle('transform: rotateY(180deg)');
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
    const current = Number(bankDisplay.textContent.slice(1));
    expect(current).toEqual(bank - bet);
  });

  // hold some cards
  fireEvent.click(cards[1].querySelector('div'));
  fireEvent.click(cards[2].querySelector('div'));
  expect(cards[1]).toHaveClass('held');
  expect(cards[2]).toHaveClass('held');

  // discard and draw
  fireEvent.click(dealBtn);
  // draw is disabled while cards are turning
  expect(dealBtn).toBeDisabled();
  await wait(() => expect(dealBtn).not.toBeDisabled());

  // check for three new cards
  cards = getAllByTestId('card');
  expect(cardValues[0]).not.toEqual(cards.map(getCardValue)[0]);
  expect(cardValues[1]).toEqual(cards.map(getCardValue)[1]);
  expect(cardValues[2]).toEqual(cards.map(getCardValue)[2]);
  expect(cardValues[3]).not.toEqual(cards.map(getCardValue)[3]);
  expect(cardValues[4]).not.toEqual(cards.map(getCardValue)[4]);

  // score hand
  const win = queryByText(/you win/i);
  const noWin = queryByText(/game over/i);
  expect(win || noWin).toBeTruthy();

  // check bank
  if (win) {
    const cardValues = cards.map(getCardValue);
    const [payout] = scoreHand(cardValues);
    const winnings = payout * bet;
    await waitForDomChange(() => {
      const current = Number(bankDisplay.textContent.slice(1));
      expect(current).toEqual(bank - bet + winnings);
    });
  } else {
    const current = Number(bankDisplay.textContent.slice(1));
    expect(current).toEqual(bank - bet);
  }
});
