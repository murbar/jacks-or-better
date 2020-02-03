import React from 'react';
import styled from 'styled-components';
import ValueTween from 'components/ValueTween';

const Styles = styled.div`
  display: flex;
  margin: 3rem 0;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-family: ${p => p.theme.fonts.display};
  font-size: 3rem;
  letter-spacing: 1px;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
`;

const Bank = styled.div`
  text-align: right;
`;

const Bet = styled.div`
  text-align: left;
`;

export default function Stats({ gameState, playerState }) {
  const { bank } = playerState;
  const { currentBet } = gameState;

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
        <div>
          $<ValueTween>{bank}</ValueTween>
        </div>
      </Bank>
    </Styles>
  );
}
