import React from 'react';
import styled, { css } from 'styled-components';
import ValueTween from 'components/ValueTween';
import { effect3dSmall, mediaQuery } from 'styles/helpers';
import { bounceIn, slideInLeft, slideInRight } from 'styles/animations';
import Stacks from './Stacks';

const Styles = styled.div`
  margin: 5rem 0 0;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  font-family: ${p => p.theme.fonts.cards};
  font-weight: bold;
  cursor: default;
  & > div {
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
  ${mediaQuery.above.phone`
    margin-top: 2rem;
  `}
`;

const Bank = styled.div`
  text-align: right;
  animation: ${slideInRight} 0.75s;
`;

const Bet = styled.div`
  animation: ${slideInLeft} 0.75s;
`;

const BetAmount = styled.div`
  font-family: ${p => p.theme.fonts.display};
  font-size: 4rem;
  letter-spacing: 1px;
  font-weight: 400;
  margin-top: 0.75rem;
  ${p => effect3dSmall(p.theme.colors.offWhite)}
  .dollar-sign {
    font-size: 0.8em;
  }
`;

const BankAmount = styled(BetAmount)`
  ${p =>
    p.didWin &&
    css`
      animation: 1s ${bounceIn};
    `}
`;

export default function Stats({ gameState, playerState }) {
  const { bank } = playerState;
  const { currentBet, didScore, didDeal, didDraw, winnings } = gameState;
  const didWin = didScore && winnings !== 0;
  const inPLay = (didDeal || didDraw) && !didScore;

  return (
    <Styles>
      <div>
        <Bet>
          Bet
          <BetAmount title={`Current bet is $${currentBet}`}>
            <span className="dollar-sign">$</span>
            <ValueTween duration={250}>{currentBet}</ValueTween>
          </BetAmount>
        </Bet>
        <Bank>
          Bank
          <BankAmount didWin={didWin} title={`Bank is $${bank}`}>
            <span className="dollar-sign">$</span>
            <ValueTween>{bank}</ValueTween>
          </BankAmount>
        </Bank>
      </div>
      <Stacks bet={gameState.currentBet} bank={playerState.bank} inPLay={inPLay} />
    </Styles>
  );
}
