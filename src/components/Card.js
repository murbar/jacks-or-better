import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HeartsSVG } from 'images/hearts.svg';
import { ReactComponent as ClubsSVG } from 'images/clubs.svg';
import { ReactComponent as SpadesSVG } from 'images/spades.svg';
import { ReactComponent as DiamondsSVG } from 'images/diamonds.svg';
import { ReactComponent as JackSVG } from 'images/jack-cir.svg';
import { ReactComponent as QueenSVG } from 'images/queen-cir.svg';
import { ReactComponent as KingSVG } from 'images/king-cir.svg';
import { addHslAlpha, mediaAbove } from 'styles/helpers';
import { getRankAndSuit } from 'poker';
import { bounce, flip } from 'styles/animations';

// https://3dtransforms.desandro.com/card-flip

const randomInRange = (start, end) =>
  Math.floor(Math.random() * (1 + end - start)) + start;

const highCardValues = {
  '14': 'A',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

const faceImagesMap = {
  '11': <JackSVG />,
  '12': <QueenSVG />,
  '13': <KingSVG />
};

const suitImageMap = {
  H: <HeartsSVG />,
  D: <DiamondsSVG />,
  S: <SpadesSVG />,
  C: <ClubsSVG />
};

const hiddenStyles = css`
  background: #aaa;
  svg,
  span {
    display: none;
  }
`;

const heldStyles = css`
  box-shadow: 0 0 0 0.5rem ${p => addHslAlpha(p.theme.colors.highlight, 1)};
`;

const didScoreStyles = css`
  pointer-events: none;
`;

const didWinStyles = css`
  animation: 1.5s ${p => p.index * 50}ms infinite ${bounce};
`;

const Styles = styled.div`
  /* animation: ${flip} 1s alternate infinite; */
  --card-size: 8rem;
  --radius: 0.5rem;
  ${mediaAbove.px500`
    --card-size: 8.5rem;
  `}
  ${mediaAbove.px600`
    --card-size: 10rem;
  `}
  ${mediaAbove.px700`
    --card-size: 11rem;
  `}
  ${mediaAbove.px800`
    --card-size: 12rem;
  `}
  ${mediaAbove.px900`
    --card-size: 13rem;
  `}
  ${mediaAbove.px950`
    --card-size: 15rem;
  `}
  ${mediaAbove.px1100`
    --card-size: 16.5rem;
  `}
  position: relative;
  width: var(--card-size);
  min-width: 7rem;
  max-width: 18.5vw;
  height: calc(var(--card-size) * 1.4);
  padding: 0.5rem 0.5rem;
  margin: 0 0.35rem;
  font-family: ${p => p.theme.fonts.cards};
  font-weight: 700;
  line-height: 1;
  font-size: calc(var(--card-size) * 0.3);
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.cardHD : p.theme.colors.cardSC)};
  border-radius: var(--radius);
  background: white;
  box-shadow: 0.2rem 0.2rem 1.5rem rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.1);
  transition: margin 250ms, opacity 250ms;
  overflow: hidden;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    transform: ${p => !p.hide && !p.didDraw && 'scale(1.02)'} rotate(${p => p.tilt}deg);
  }

  span:nth-of-type(1) {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
  
  span:nth-of-type(2) {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    transform: rotate(180deg);
  }

  svg.card-suit {
    --w: calc(var(--card-size) * 0.35);
    position: absolute;
    width: auto;
    height: var(--w);
    top: calc(50% - (var(--w) / 2));
    right: calc(50% - (var(--w) / 2));
  }

  svg.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left:0;
  }

  ${p => p.isHeld && heldStyles}
  ${p => p.isHidden && hiddenStyles}
  ${p => p.didScore && didScoreStyles}
  ${p => p.didWin && didWinStyles}
`;

const Container = styled.div`
  ${p => p.isHeld && 'margin-bottom: -2.5rem;'}
  transform: rotate(${p => p.tilt}deg);
  transition: all 250ms;
`;

const Held = styled.div`
  width: 100%;
  text-align: center;
  font-family: ${p => p.theme.fonts.cards};
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: ${p => p.theme.colors.highlight};
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  visibility: ${p => (p.isHeld ? 'visible' : 'hidden')};
`;

function Card({ value, index, hidden, held, didDraw, didScore, didWin, onClick }) {
  let [rank, suit] = getRankAndSuit(value);
  const rankString = rank in highCardValues ? highCardValues[rank] : rank;
  const tilt = React.useRef(randomInRange(-2, 2));
  const rankVal = parseInt(rank, 10);
  const isFace = rankVal > 10 && rankVal < 14;

  return (
    <Container tilt={tilt.current} isHeld={held}>
      <Styles
        index={index}
        suit={suit}
        isFace={isFace}
        isHidden={hidden}
        didScore={didScore}
        didDraw={didDraw}
        didWin={didWin}
        isHeld={held}
        onClick={onClick}
      >
        <span>{rankString}</span>
        {suitImageMap[suit]}
        <span>{rankString}</span>
        {isFace && faceImagesMap[rankVal]}
      </Styles>
      <Held isHeld={held}>HELD</Held>
    </Container>
  );
}

export default Card;
