import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as HeartsSVG } from 'images/hearts.svg';
import { ReactComponent as ClubsSVG } from 'images/clubs.svg';
import { ReactComponent as SpadesSVG } from 'images/spades.svg';
import { ReactComponent as DiamondsSVG } from 'images/diamonds.svg';
import { addHslAlpha } from 'styles/helpers';
import { getRankAndSuit } from 'poker';

// https://3dtransforms.desandro.com/card-flip

const faces = {
  '14': 'A',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

const suitImageMap = {
  H: <HeartsSVG />,
  D: <DiamondsSVG />,
  S: <SpadesSVG />,
  C: <ClubsSVG />
};

const hiddenStyles = css`
  background: gray;
  color: transparent;
  svg {
    display: none;
  }
`;

const heldStyles = css`
  box-shadow: 0 0 0 0.5rem ${p => addHslAlpha(p.theme.colors.green, 1)};
`;

const Styles = styled.div`
  --card-size: 8rem;
  position: relative;
  width: var(--card-size);
  height: calc(var(--card-size) * 1.4);
  padding: 0.5rem 0.5rem;
  font-family: Montserrat;
  font-weight: 700;
  line-height: 1;
  font-size: calc(var(--card-size) * 0.3);
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.red : p.theme.colors.offBlack)};
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background: white;
  box-shadow: 0.2rem 0.2rem 1.5rem rgba(0, 0, 0, 0.2);
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
  ${p => p.hold && heldStyles}
  ${p => p.hide && hiddenStyles}
`;

function Card({ value, hidden, held, onClick }) {
  let [rank, suit] = getRankAndSuit(value);
  rank = rank in faces ? faces[rank] : rank;

  return (
    <Styles suit={suit} hide={hidden} hold={held} onClick={onClick}>
      <span>{rank}</span>
      {suitImageMap[suit]}
      <span>{rank}</span>
    </Styles>
  );
}

export default Card;
