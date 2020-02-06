import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import useViewportSize from 'hooks/useViewportSize';
import { DEVICE_SIZES, mediaQuery } from 'styles/helpers';
import { slideInLeft, slideInRight } from 'styles/animations';

const Styles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  ${mediaQuery.below.px500`
    margin-left: -1rem;
    margin-right: -1rem;
  `}
  ${mediaQuery.above.phone`
    margin-bottom: 2rem;
  `}
`;

const BetControls = styled.div`
  display: flex;
  flex: 1;
  animation: ${slideInLeft} 0.75s;
`;

const BetButton = styled(Button)`
  padding: 1.25rem 1.5rem;
`;

const DealButton = styled(BetButton)`
  width: 13rem;
  margin-right: 0;
  animation: ${slideInRight} 0.75s;
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
        <BetButton onClick={incrementBet} disabled={didDeal || busy} title="Bet one">
          Bet {largeDisplay && 'One'}
        </BetButton>
        <BetButton onClick={setMaxBet} disabled={didDeal || busy} title="Bet max">
          {largeDisplay && 'Bet'} Max
        </BetButton>
      </BetControls>

      <DealButton
        onClick={play}
        disabled={busy}
        pulse={!didDeal && didScore}
        title={`${didDeal ? 'Discard and draw' : 'Deal a hand'}`}
      >
        {didDeal ? 'Draw' : 'Deal'}
      </DealButton>
    </Styles>
  );
}
