import React from 'react';
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
  const { hand, hidden, held, didDeal, didDraw, didScore, busy, winnings } = gameState;
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
            hidden={hidden[i]}
            held={held[i]}
            didDraw={gameState.didDraw}
            didScore={didScore}
            didWin={isWinState}
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
