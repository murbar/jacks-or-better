import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { mediaAbove, effect3d } from 'styles/helpers';

const color = theme.colors.gold;
const Styles = styled.div`
  display: flex;
  margin-bottom: 3rem;
  width: 100%;
  height: 1em;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  text-align: center;
  font-family: ${theme.fonts.display};
  font-size: 3.5rem;
  color: ${color};
  letter-spacing: 1px;
  line-height: 1;
  z-index: 100;
  
  ${effect3d(color)}
  ${mediaAbove.px500`
    font-size: 4.5rem;
  `}
  ${mediaAbove.px600`
    font-size: 5.5rem;
  `}
  ${mediaAbove.px700`
    font-size: 6rem;
  `}
  ${mediaAbove.px800`
    font-size: 7rem;
  `}
`;

export default function Message({ gameState, states }) {
  return <Styles>{states.winState && `${gameState.winningHand}!`}</Styles>;
}
