import React from 'react';
import styled from 'styled-components';
import { slideInLeft, slideInRight } from 'styles/animations';
import ChipStack from 'components/ChipStack';

const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem -3rem;
  align-items: center;
`;

const Bank = styled.div`
  text-align: right;
  animation: ${slideInRight} 0.75s;
`;

const Bet = styled.div`
  animation: ${slideInLeft} 0.75s;
`;

export default function Stacks({ bet, bank }) {
  return (
    <Styles>
      <Bet>
        <ChipStack total={bet} />
      </Bet>
      <Bank>
        <ChipStack total={bank} />
      </Bank>
    </Styles>
  );
}
