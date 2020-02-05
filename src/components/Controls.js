import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Styles = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: space-between;
  align-items: center;
`;

const ControlButton = styled(Button)`
  padding: 1.5rem 2.5rem;
`;

export default function Controls({ gameState, actions }) {
  const { busy, didDeal, didScore } = gameState;
  const { incrementBet, setMaxBet, play } = actions;

  return (
    <Styles>
      <div>
        <ControlButton
          onClick={incrementBet}
          disabled={didDeal || busy}
          title="Set your bet"
          data-testid="bet-button"
        >
          Bet
        </ControlButton>
        <ControlButton
          onClick={setMaxBet}
          disabled={didDeal || busy}
          title="Set your bet to the max"
          data-testid="bet-max-button"
        >
          Max
        </ControlButton>
      </div>

      <ControlButton
        onClick={play}
        disabled={busy}
        pulse={!didDeal && didScore}
        data-testid="deal-button"
      >
        {didDeal ? 'Draw' : 'Deal'}
      </ControlButton>
    </Styles>
  );
}
