import React from 'react';
import styled from 'styled-components';
import { StatusStyles } from 'components/HandStatus';
import { mediaQuery } from 'styles/helpers';

const Styles = styled(StatusStyles)`
  margin-top: 0;
  margin-bottom: 3rem;
  ${mediaQuery.above.phoneSmall`
    margin-bottom: 5rem;
  `}
`;

export default function Message({ gameState, states }) {
  return (
    <Styles title={states.isWinState ? `${gameState.winningHand}!` : ''}>
      {states.isWinState && `${gameState.winningHand}!`}
    </Styles>
  );
}
