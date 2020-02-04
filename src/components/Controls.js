import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Styles = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: center;
`;

const PlayButton = styled(Button)`
  padding: 1.5rem 2.5rem;
`;

export default function Controls({ gameState, actions }) {
  const { busy, didDeal, didScore } = gameState;
  const { incrementBet, setMaxBet, play } = actions;

  return (
    <Styles>
      <div>
        <PlayButton
          onClick={incrementBet}
          disabled={didDeal || busy}
          title="Set your bet"
        >
          Bet
        </PlayButton>
        <PlayButton
          onClick={setMaxBet}
          disabled={didDeal || busy}
          title="Set your bet to the max"
        >
          Max
        </PlayButton>
      </div>
      <PlayButton onClick={play} disabled={busy} pulse={!didDeal && didScore}>
        {didDeal ? 'Draw' : 'Deal'}
      </PlayButton>
    </Styles>
  );
}
