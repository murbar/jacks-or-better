import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';

const Styles = styled.div``;

const Cards = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Hand({ gameState, toggleHeld }) {
  const { hand, hidden, held } = gameState;

  return (
    <Styles>
      <Cards>
        {hand.map((v, i) => (
          <Card
            key={v}
            value={v}
            hidden={hidden[i]}
            held={held[i]}
            onClick={() => toggleHeld(i)}
          />
        ))}
      </Cards>
    </Styles>
  );
}

export default Hand;
