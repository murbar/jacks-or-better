import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';
import HandTitle from './HandTitle';
import HandStatus from './HandStatus';

const Styles = styled.div`
  position: relative;
  margin: 1rem -1rem;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 20;
`;

function Hand({ gameState, toggleHeld }) {
  const { hand, hidden, held, didDeal, didDraw, didScore, busy, winnings } = gameState;
  const initState = !didDeal && !didDraw && !didScore && !busy;
  const winState = didScore && winnings !== 0;
  const noWinState = didScore && winnings === 0;

  return (
    <Styles>
      <HandTitle gameState={gameState} states={{ initState, winState, noWinState }} />
      <Cards>
        {hand.map((v, i) => (
          <Card
            key={v}
            value={v}
            index={i}
            hidden={hidden[i]}
            held={held[i]}
            didDraw={gameState.didDraw}
            didScore={didScore}
            didWin={winState}
            onClick={() => toggleHeld(i)}
          />
        ))}
      </Cards>
      <HandStatus gameState={gameState} states={{ initState, winState, noWinState }} />
    </Styles>
  );
}

export default Hand;

// test card
// <Card
//   value="11C"
//   hidden={false}
//   held={true}
//   didDraw={false}
//   onClick={() => {}}
//   didScore={false}
// />
