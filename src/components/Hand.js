import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card';
import HandTitle from './HandTitle';
import HandStatus from './HandStatus';

const Styles = styled.div`
  margin: 1rem 0;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;
`;

export default function Hand({ gameState, toggleHeld }) {
  const {
    hand,
    cardsFaceDown,
    cardsHeld,
    didDeal,
    didDraw,
    didScore,
    busy,
    winnings
  } = gameState;
  const isInitState = !didDeal && !didDraw && !didScore && !busy;
  const isWinState = didScore && winnings !== 0;
  const isNoWinState = didScore && winnings === 0;

  return (
    <Styles>
      <HandTitle
        gameState={gameState}
        states={{ isInitState, isWinState, isNoWinState }}
      />
      <Cards>
        {hand.map((v, i) => (
          <Card
            key={v}
            index={i}
            value={v}
            isFaceDown={cardsFaceDown[i]}
            isHeld={cardsHeld[i]}
            didDraw={gameState.didDraw}
            didScore={didScore}
            didWin={isWinState}
            busy={busy}
            onClick={() => toggleHeld(i)}
          />
        ))}
      </Cards>
      <HandStatus
        gameState={gameState}
        states={{ isInitState, isWinState, isNoWinState }}
      />
    </Styles>
  );
}

Hand.propTypes = {
  gameState: PropTypes.shape({
    hand: (props, propName) => {
      if (props[propName].length !== 5) return new Error(`Hand must be of length 5`);
    },
    didDeal: PropTypes.bool.isRequired,
    didScore: PropTypes.bool.isRequired,
    busy: PropTypes.bool.isRequired,
    winnings: PropTypes.number.isRequired
  }).isRequired,
  toggleHeld: PropTypes.func.isRequired
};
