import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';

const Styles = styled.div``;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Hand({ gameState, setHeld }) {
  const { hand, held } = gameState;

  const toggleHold = i => {
    // if draws == 0
    setHeld(i);
  };

  console.log(hand);

  return (
    <Styles>
      <Cards>
        {hand.map((v, i) => (
          <Card key={v} value={v} held={held[i]} onClick={() => toggleHold(i)} />
        ))}
      </Cards>
    </Styles>
  );
}

export default Hand;
