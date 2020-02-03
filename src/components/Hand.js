import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';
import Message from './Message';

const Styles = styled.div`
  position: relative;
  margin: 5rem -1rem;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Hand({ gameState, toggleHeld }) {
  const { hand, hidden, held, didDeal, didDraw, didScore, busy, winnings } = gameState;
  const initState = !didDeal && !didDraw && !didScore && !busy;
  const winState = didScore && winnings !== 0;
  const noWinState = didScore && winnings === 0;

  return (
    <Styles>
      <Cards>
        {hand.map((v, i) => (
          <Card
            key={v}
            value={v}
            hidden={hidden[i]}
            held={held[i]}
            didDraw={gameState.didDraw}
            onClick={() => toggleHeld(i)}
            didScore={didScore}
          />
        ))}
      </Cards>
      <Message gameState={gameState} states={{ initState, winState, noWinState }} />
    </Styles>
  );
}

export default Hand;
