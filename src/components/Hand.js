import React from 'react';
import styled from 'styled-components';
import Card from 'components/Card';

const Styles = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Hand({ cards }) {
  return (
    <Styles>
      {cards.map(v => (
        <Card key={v} value={v} />
      ))}
    </Styles>
  );
}

export default Hand;
