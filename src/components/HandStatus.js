import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { mediaQuery, effect3d } from 'styles/helpers';
import { tada } from 'styles/animations';

const textColor = theme.colors.gold;
export const StatusStyles = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
  height: 1em;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  text-align: center;
  font-family: ${theme.fonts.display};
  font-size: 3.5rem;
  color: ${textColor};
  letter-spacing: -1px;
  line-height: 1;
  z-index: 2000;
  
  ${effect3d(textColor)}
  ${mediaQuery.above.px500`
    font-size: 4.5rem;
  `}
  ${mediaQuery.above.px600`
    font-size: 5.5rem;

  `}
  ${mediaQuery.above.px700`
    font-size: 6rem;
  `}
  ${mediaQuery.above.px800`
    font-size: 7rem;
  `}
`;

const Winnings = styled.div`
  margin-top: 1rem;
  font-size: 1.2em;
  animation: 1s ${tada};
`;

const GameOver = styled.div`
  font-size: 1.4em;
`;

const GoodLuck = styled.div`
  font-size: 1.4em;
`;

const MESSAGE_STRINGS = {
  goodLuck: 'Good Luck',
  gameOver: 'Game Over',
  youWin: 'You Win'
};

export default function HandStatus({ gameState, states }) {
  return (
    <StatusStyles>
      {states.isInitState && <GoodLuck>{MESSAGE_STRINGS.goodLuck}</GoodLuck>}
      {states.isNoWinState && <GameOver>{MESSAGE_STRINGS.gameOver}</GameOver>}
      {states.isWinState && (
        <Winnings>
          {MESSAGE_STRINGS.youWin} ${gameState.winnings}
        </Winnings>
      )}
    </StatusStyles>
  );
}
