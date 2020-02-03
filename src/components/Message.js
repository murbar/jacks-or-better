import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { adjustHslLightness } from 'styles/helpers';

const MESSAGE_STRINGS = {
  goodLuck: 'Good Luck',
  gameOver: 'Game Over',
  youWin: 'You Win'
};

const color = theme.colors.gold;
console.log(color);
const effect3d = css`
  text-shadow: 0 0.1rem 0 ${adjustHslLightness(color, -20)},
    0rem -0.1rem 0 ${adjustHslLightness(color, 30)},
    0 0.2rem 0 ${adjustHslLightness(color, -20)},
    0 0.3rem 0 ${adjustHslLightness(color, -20)},
    0 0.4rem 0 ${adjustHslLightness(color, -20)}, 0.1rem 1rem 0.5rem rgba(16, 16, 16, 0.3),
    0.1rem 1.2rem 1rem rgba(16, 16, 16, 0.2), 0.1rem 1.4rem 3rem rgba(16, 16, 16, 0.2),
    0.1rem 1.6rem 5rem rgba(16, 16, 16, 0.3);
`;

const Styles = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  text-align: center;
  font-family: ${theme.fonts.display};
  font-size: 3.5rem;
  color: ${color};
  letter-spacing: 1px;
  line-height: 1;
  ${effect3d}
`;

const Winnings = styled.div`
  margin-top: 1rem;
  font-size: 1.2em;
`;

const GameOver = styled.div`
  font-size: 1.4em;
`;

const GoodLuck = styled.div`
  font-size: 1.4em;
`;

const YouWin = ({ hand, winnings }) => {
  return (
    <div>
      {hand}!
      <Winnings>
        {MESSAGE_STRINGS.youWin} ${winnings}
      </Winnings>
    </div>
  );
};

export default function Message({ gameState, states }) {
  const { winningHand, winnings } = gameState;

  return (
    <Styles>
      {states.initState && <GoodLuck>{MESSAGE_STRINGS.goodLuck}</GoodLuck>}
      {states.winState && <YouWin hand={winningHand} winnings={winnings} />}
      {states.noWinState && <GameOver>{MESSAGE_STRINGS.gameOver}</GameOver>}
    </Styles>
  );
}
