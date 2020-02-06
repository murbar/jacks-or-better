import React from 'react';
import styled, { css } from 'styled-components';
import ValueTween from 'components/ValueTween';
import { effect3dSmall, mediaQuery } from 'styles/helpers';
import { bounceIn, slideInLeft, slideInRight } from 'styles/animations';

const Styles = styled.div`
  display: flex;
  margin: 6rem 0 0;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  font-family: ${p => p.theme.fonts.cards};
  font-weight: bold;
  cursor: default;
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
  const { currentBet, didScore, winnings } = gameState;
  const didWin = didScore && winnings !== 0;

  return (
    <Styles>
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
    </Styles>
  );
}
