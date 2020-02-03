import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: ${p => p.theme.fonts.display};
  font-size: 3rem;
  letter-spacing: 1px;
  line-height: 1;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  /* text-transform: uppercase; */
`;

const GameOver = () => {
  return <span>Game Over</span>;
};

const GoodLuck = () => {
  return <span>Good Luck</span>;
};

const YouWin = ({ hand, winnings }) => {
  return (
    <span>
      {hand}!
      <br />
      You win ${winnings}
    </span>
  );
};

export default function Message({ gameState }) {
  const { winningHand, winnings, didScore } = gameState;
  return (
    <Styles>
      {didScore ? (
        winnings !== 0 ? (
          <YouWin hand={winningHand} winnings={winnings} />
        ) : (
          <GameOver />
        )
      ) : (
        <GoodLuck />
      )}
    </Styles>
  );
}
