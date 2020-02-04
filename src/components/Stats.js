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
  text-align: center;
  font-family: ${p => p.theme.fonts.display};
  font-size: 3rem;
  letter-spacing: 1px;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  ${p => effect3dSmall(p.theme.colors.offWhite)}
`;

const Bank = styled.div`
  text-align: right;
`;

const BankAmount = styled.div`
  ${p => p.didWin && didWinAnimation}
  /* ${didWinAnimation} */
`;

const Bet = styled.div`
  text-align: left;
`;

export default function Stats({ gameState, playerState }) {
  const { bank } = playerState;
  const { currentBet, didScore, winnings } = gameState;
  const didWin = didScore && winnings !== 0;

  return (
    <Styles>
      <Bet>
        Bet
        <div>
          $<ValueTween duration={250}>{currentBet}</ValueTween>
        </div>
      </Bet>
      <Bank>
        Bank
        <BankAmount didWin={didWin}>
          $<ValueTween>{bank}</ValueTween>
        </BankAmount>
      </Bank>
    </Styles>
  );
}
