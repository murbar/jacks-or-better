import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HeartsSVG } from 'images/hearts.svg';
import { ReactComponent as ClubsSVG } from 'images/clubs.svg';
import { ReactComponent as SpadesSVG } from 'images/spades.svg';
import { ReactComponent as DiamondsSVG } from 'images/diamonds.svg';
import { ReactComponent as JackSVG } from 'images/jack-cir.svg';
import { ReactComponent as QueenSVG } from 'images/queen-cir.svg';
import { ReactComponent as KingSVG } from 'images/king-cir.svg';
import cardBackSVG from 'images/card-back.svg';
import { addHslAlpha, mediaQuery } from 'styles/helpers';
import { getRankAndSuit } from 'poker';
import { bounce } from 'styles/animations';
import { randomInRange } from 'utils';

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

const cardShadows = `0.2rem 0.2rem 1.5rem rgba(0, 0, 0, 0.2),
    0.2rem 2rem 3rem rgba(0, 0, 0, 0.2),
    inset 0 -1rem 2rem rgba(0, 0, 0, 0.1)`;

const heldStyles = css`
  box-shadow: ${cardShadows},
    0 0 0 0.5rem ${p => addHslAlpha(p.theme.colors.highlight, 1)};
`;

const didScoreStyles = css`
  pointer-events: none;
`;

const Styles = styled.div`
  --card-size: 8rem;
  --radius: 0.5rem;

  margin: 0 0.35rem;
  transform: rotate(${p => p.tilt}deg);
  transition: all 250ms;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  ${p => p.isHeld && 'margin-bottom: -2.5rem;'}
`;

const WinBounce = styled.div`
  ${p =>
    p.didWin &&
    css`
      animation: 1.5s ${p => p.index * 50}ms infinite ${bounce};
    `}
`;

const CardContainer = styled.div`
  --card-size: 8rem;
  --radius: 0.5rem;
  ${mediaQuery.above.px500`
    --card-size: 8.5rem;
  `}
  ${mediaQuery.above.px600`
    --card-size: 10rem;
  `}
  ${mediaQuery.above.px700`
    --card-size: 11rem;
  `}
  ${mediaQuery.above.px800`
    --card-size: 12rem;
  `}
  ${mediaQuery.above.px900`
    --card-size: 13rem;
  `}
  ${mediaQuery.above.px950`
    --card-size: 15rem;
  `}

  position: relative;
  width: var(--card-size);
  min-width: 7rem;
  max-width: 18.5vw;
  height: calc(var(--card-size) * 1.4);
  transition: transform 200ms;
  transform-style: preserve-3d;

  &:hover {
    transform: ${p => !p.isFaceDown && !p.didDraw && 'rotateY(180deg) scale(1.02)'};
  }

  ${p => !p.isFaceDown && 'transform: rotateY(180deg)'};
`;

const CardFrontAndBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  box-shadow: ${cardShadows};
  overflow: hidden;
  backface-visibility: hidden;
`;

const CardBack = styled(CardFrontAndBack)`
  background-color: ${p => p.theme.colors.cardBackside};
  background-image: url(${cardBackSVG});
  background-position: center;
  background-size: cover;
  border: 0.3rem solid ${p => p.theme.colors.cardBackground};

  ${mediaQuery.above.px600`
    border: 0.5rem solid ${p => p.theme.colors.cardBackground};
  `};
`;

const CardFront = styled(CardFrontAndBack)`
  padding: 0.5rem 0.5rem;
  background: ${p => p.theme.colors.cardBackground};
  font-family: ${p => p.theme.fonts.cards};
  font-size: calc(var(--card-size) * 0.3);
  font-weight: 700;
  line-height: 1;
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.cardHD : p.theme.colors.cardSC)};
  transform: rotateY(180deg); /* on backside of CardBack */

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
    pointer-events: none;
  }
  svg.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  ${p => p.isHeld && heldStyles}
  ${p => p.didScore && didScoreStyles}
`;

const HoldIndicator = styled.div`
  text-align: center;
  font-family: ${p => p.theme.fonts.cards};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  margin-top: 1rem;
  color: ${p => p.theme.colors.highlight};
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  visibility: ${p => (p.isHeld ? 'visible' : 'hidden')};
`;

export default function Card({
  value,
  index,
  isFaceDown,
  isHeld,
  didDraw,
  didScore,
  didWin,
  onClick
}) {
  let [rank, suit] = getRankAndSuit(value);
  const rankString = rank in highCardValues ? highCardValues[rank] : rank;
  const tilt = React.useRef(randomInRange(-2, 2));
  const rankVal = parseInt(rank, 10);
  const isFace = rankVal > 10 && rankVal < 14;

  return (
    <Styles isHeld={isHeld} tilt={tilt.current}>
      <WinBounce index={index} didWin={didWin}>
        <CardContainer
          isFaceDown={isFaceDown}
          didWin={didWin}
          didDraw={didDraw}
          data-testid="card"
        >
          <CardFront suit={suit} didScore={didScore} isHeld={isHeld} onClick={onClick}>
            <span>{rankString}</span>
            {suitImageMap[suit]}
            <span>{rankString}</span>
            {isFace && faceImagesMap[rankVal]}
          </CardFront>
          <CardBack />
        </CardContainer>
      </WinBounce>
      <HoldIndicator isHeld={isHeld}>HELD</HoldIndicator>
    </Styles>
  );
}
