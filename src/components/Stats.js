import React from 'react';
import styled, { css } from 'styled-components';
import ValueTween from 'components/ValueTween';
import { effect3dSmall, mediaQuery } from 'styles/helpers';
import { bounceIn } from 'styles/animations';
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
    margin-top: 3rem;
  `}
`;

const Bank = styled.div`
  text-align: right;
`;

const Bet = styled.div``;

const BetAmount = styled.div`
  font-family: ${p => p.theme.fonts.display};
  font-size: 3rem;
  letter-spacing: 1px;
  font-weight: 400;
  margin-top: 0.75rem;
  ${p => effect3dSmall(p.theme.colors.offWhite)}
  .dollar-sign {
    font-size: 0.8em;
  }
  ${mediaQuery.above.phoneSmall`
    font-size: 4rem;
  `}
`;

const BankAmount = styled(BetAmount)`
  ${p =>
    p.didWin &&
    css`
      animation: 1s ${bounceIn};
    `}
`;

const Stats = ({ gameState, playerState }) => {
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
};

export default Stats;
