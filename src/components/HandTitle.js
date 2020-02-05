import React from 'react';
import styled from 'styled-components';
import { StatusStyles } from 'components/HandStatus';

const Styles = styled(StatusStyles)`
  margin-top: 0;
  margin-bottom: 3rem;
`;

export default function Message({ gameState, states }) {
  return <Styles>{states.isWinState && `${gameState.winningHand}!`}</Styles>;
}
