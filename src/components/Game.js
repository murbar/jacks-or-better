import React from 'react';
import styled from 'styled-components';
import Hand from 'components/Hand';
import { newDeck } from 'poker';

function takeCards(deck, count) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(deck.pop());
  }
  return cards;
}

const Styles = styled.div``;

function initGameState() {
  const deck = newDeck();
  return {
    deck,
    hand: takeCards(deck, 5),
    held: Array(5).fill(false),
    shown: Array(5).fill(false),
    deals: 0,
    bank: 500,
    defaultBet: 5
  };
}

console.log(initGameState());

function Game() {
  const [deck, setDeck] = React.useState(newDeck());
  const [hand, setHand] = React.useState(takeCards(deck, 5));
  const [held, setHeld] = React.useState(Array(5).fill(false));
  const [deals, setDeals] = React.useState(0);

  return (
    <Styles>
      <Hand cards={hand} />
      <div>
        <button>Bet</button>
        <button>Deal</button>
      </div>
    </Styles>
  );
}

export default Game;
