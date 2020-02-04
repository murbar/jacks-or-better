import React from 'react';
import styled, { css } from 'styled-components';
import ValueTween from 'components/ValueTween';
import { effect3dSmall } from 'styles/helpers';
import { bounceIn } from 'styles/animations';

const didWinAnimation = css`
  animation: 1s ${bounceIn};
`;

const Styles = styled.div`
  display: flex;
  margin: 3rem 0 0;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  font-family: ${p => p.theme.fonts.cards};
`;

const Bank = styled.div`
  text-align: right;
`;

const Bet = styled.div``;
const BetAmount = styled.div`
  font-family: ${p => p.theme.fonts.display};
  font-size: 4rem;
  letter-spacing: 1px;
  font-weight: 400;
  ${p => effect3dSmall(p.theme.colors.offWhite)}
  .dollar-sign {
    font-size: 0.8em;
  }
`;

const BankAmount = styled(BetAmount)`
  ${p => p.didWin && didWinAnimation}
`;

export default function Stats({ gameState, playerState }) {
  const { bank } = playerState;
  const { currentBet, didScore, winnings } = gameState;
  const didWin = didScore && winnings !== 0;

  return (
    <Styles>
      <Bet>
        Bet
        <BetAmount>
          <span className="dollar-sign">$</span>
          <ValueTween duration={250}>{currentBet}</ValueTween>
        </BetAmount>
      </Bet>
      <Bank>
        Bank
        <BankAmount didWin={didWin}>
          <span className="dollar-sign">$</span>
          <ValueTween>{bank}</ValueTween>
        </BankAmount>
      </Bank>
    </Styles>
  );
}
