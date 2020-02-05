import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import useViewportSize from 'hooks/useViewportSize';
import { DEVICE_SIZES, mediaQuery, mediaAbove } from 'styles/helpers';

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BetControls = styled.div`
  display: flex;
  flex: 1;
`;

const BetButton = styled(Button)`
  padding: 1.25rem 1.5rem;
`;

const DealButton = styled(BetButton)`
  width: 13rem;
  ${mediaQuery.above.px500`
    width: 16rem;
  `}
`;

export default function Controls({ gameState, actions }) {
  const { busy, didDeal, didScore } = gameState;
  const { incrementBet, setMaxBet, play } = actions;
  const { width } = useViewportSize();
  const largeDisplay = width > DEVICE_SIZES.px500;

  return (
    <Styles>
      <BetControls>
        <BetButton
          onClick={incrementBet}
          disabled={didDeal || busy}
          title="Set your bet"
          data-testid="bet-button"
        >
          Bet {largeDisplay && 'One'}
        </BetButton>
        <BetButton
          onClick={setMaxBet}
          disabled={didDeal || busy}
          title="Set your bet to the max"
          data-testid="bet-max-button"
        >
          {largeDisplay && 'Bet'} Max
        </BetButton>
      </BetControls>

      <DealButton
        onClick={play}
        disabled={busy}
        pulse={!didDeal && didScore}
        data-testid="deal-button"
      >
        {didDeal ? 'Draw' : 'Deal'}
      </DealButton>
    </Styles>
  );
}
