import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Styles = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: center;
`;

export default function Controls({ gameState, actions }) {
  const { busy, didDeal, didScore } = gameState;
  const { incrementBet, setMaxBet, play } = actions;

  return (
    <Styles>
      <div>
        <Button onClick={incrementBet} disabled={didDeal || busy} title="Set your bet">
          Bet
        </Button>
        <Button
          onClick={setMaxBet}
          disabled={didDeal || busy}
          title="Set your bet to the max"
        >
          Max
        </Button>
      </div>
      <Button onClick={play} disabled={busy} pulse={!didDeal && didScore}>
        {didDeal ? 'Draw' : 'Deal'}
      </Button>
    </Styles>
  );
}
