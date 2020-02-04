import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { mediaAbove } from 'styles/helpers';
import { adjustHslLightness } from 'styles/helpers';

const MESSAGE_STRINGS = {
  goodLuck: 'Good Luck',
  gameOver: 'Game Over',
  youWin: 'You Win'
};

const color = theme.colors.gold;
const effect3d = css`
  text-shadow: 0rem -0.1rem 0 ${adjustHslLightness(color, 30)},
    0 0.1rem 0 ${adjustHslLightness(color, -20)},
    0 0.2rem 0 ${adjustHslLightness(color, -20)},
    0 0.3rem 0 ${adjustHslLightness(color, -20)},
    0 0.4rem 0 ${adjustHslLightness(color, -20)}, 0.1rem 1rem 0.5rem rgba(16, 16, 16, 0.3),
    0.1rem 1.2rem 1rem rgba(16, 16, 16, 0.2), 0.1rem 1.4rem 3rem rgba(16, 16, 16, 0.2),
    0.1rem 1.6rem 5rem rgba(16, 16, 16, 0.3), 0.1rem -1.6rem 3rem rgba(16, 16, 16, 0.3);
`;

const Styles = styled.div`
  display: flex;
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0; */
  margin-bottom: 2rem;
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
  
  ${effect3d}
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
  return <Styles>{states.winState && <div>{gameState.winningHand}!</div>}</Styles>;
}
