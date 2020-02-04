import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HeartsSVG } from 'images/hearts.svg';
import { ReactComponent as ClubsSVG } from 'images/clubs.svg';
import { ReactComponent as SpadesSVG } from 'images/spades.svg';
import { ReactComponent as DiamondsSVG } from 'images/diamonds.svg';
import jackSVG from 'images/jack.svg';
import queenSVG from 'images/queen.svg';
import kingSVG from 'images/king.svg';
import { addHslAlpha } from 'styles/helpers';
import { getRankAndSuit } from 'poker';
import { mediaAbove } from 'styles/helpers';

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
  '11': jackSVG,
  '12': queenSVG,
  '13': kingSVG
};

const faceStyles = css`
  background-image: url(${p => faceImagesMap[p.rank]});
  background-size: var(--card-size) calc((var(--card-size) * 1.4) + 2px);
  background-position: center center;
  background-repeat: no-repeat;
`;

const suitImageMap = {
  H: <HeartsSVG />,
  D: <DiamondsSVG />,
  S: <SpadesSVG />,
  C: <ClubsSVG />
};

const hiddenStyles = css`
  background: ${p => p.theme.colors.blue};
  border: 1.1rem solid white;
  svg,
  span {
    display: none;
  }
`;

const heldStyles = css`
  margin-bottom: -2.5rem;
  box-shadow: 0 0 0 0.5rem ${p => addHslAlpha(p.theme.colors.highlight, 1)};
  &::after {
    content: 'HELD';
    position: absolute;
    width: 100%;
    bottom: -2.25rem;
    left: 0;
    line-height: 1;
    text-align: center;
    font-family: ${p => p.theme.fonts.cards};
    font-size: 1.5rem;
    color: ${p => p.theme.colors.highlight};
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  }
`;

const didScoreStyles = css`
  opacity: 0.3;
`;

const Styles = styled.div`
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
  transform: rotate(${p => p.tilt}deg);
  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.1);
  transition: margin 250ms, opacity 250ms;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    transform: ${p => !p.hide && !p.didDraw && 'scale(1.02)'} rotate(${p => p.tilt}deg);
  }

  ${p => p.isFace && faceStyles}
  ${p => p.hold && heldStyles}
  ${p => p.hide && hiddenStyles}
  ${p => p.didScore && didScoreStyles}

  svg {
    --w: calc(var(--card-size) * 0.35);
    width: auto;
    height: var(--w);
    position: absolute;
    top: calc(50% - (var(--w) / 2));
    right: calc(50% - (var(--w) / 2));
  }
  span:nth-last-of-type(2) {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    transform: rotate(180deg);
  }
`;

function Card({ value, hidden, held, didDraw, didScore, onClick }) {
  let [rank, suit] = getRankAndSuit(value);
  const rankString = rank in highCardValues ? highCardValues[rank] : rank;
  const tilt = React.useRef(randomInRange(-2, 2));
  const rankVal = parseInt(rank, 10);
  const isFace = rankVal > 10 && rankVal < 14;

  return (
    <Styles
      suit={suit}
      rank={rank}
      isFace={isFace}
      hide={hidden}
      hold={held}
      didScore={didScore}
      didDraw={didDraw}
      tilt={tilt.current}
      onClick={onClick}
    >
      <span>{rankString}</span>
      {suitImageMap[suit]}
      <span>{rankString}</span>
    </Styles>
  );
}

export default Card;
