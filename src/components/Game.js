import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';
import { newDeck } from 'poker';

const Styles = styled.div`
  margin: 0 2rem;
`;

function Game() {
  const [deck, setDeck] = React.useState(newDeck());

  return (
    <Styles>
      {deck.map(v => (
        <Card key={v} value={v} />
      ))}
    </Styles>
  );
}

export default Game;
