import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from 'styles/helpers';
import { slideInLeft, slideInRight } from 'styles/animations';
import ChipStack from 'components/ChipStack';

const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -3rem -2.5rem;
  align-items: center;
  /* ${mediaQuery.above.phone`
    margin-top: 2rem;
  `} */
`;

const Bank = styled.div`
  text-align: right;
  animation: ${slideInRight} 0.75s;
`;

const Bet = styled.div`
  animation: ${slideInLeft} 0.75s;
`;

export default function Stats({ bet, bank }) {
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
