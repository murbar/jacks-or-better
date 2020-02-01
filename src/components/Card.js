import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartsSVG } from 'images/hearts.svg';
import { ReactComponent as ClubsSVG } from 'images/clubs.svg';
import { ReactComponent as SpadesSVG } from 'images/spades.svg';
import { ReactComponent as DiamondsSVG } from 'images/diamonds.svg';

const faces = {
  '1': 'A',
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

const Styles = styled.div`
  position: relative;
  width: 8rem;
  height: 12rem;
  padding: 1rem 0.75rem;
  font-family: Montserrat;
  line-height: 1;
  font-size: 2.5rem;
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.red : p.theme.colors.offBlack)};
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background: white;
  svg {
    --w: 3rem;
    width: auto;
    height: var(--w);
    position: absolute;
    top: calc(50% - (var(--w) / 2));
    right: calc(50% - (var(--w) / 2));
  }
  span:nth-last-of-type(2) {
    position: absolute;
    bottom: 1rem;
    right: 0.75rem;
  }
`;

function Card({ value }) {
  let ordinal = value.slice(0, -1);
  ordinal = ordinal in faces ? faces[ordinal] : ordinal;
  const suit = value.slice(-1);
  return (
    <Styles suit={suit}>
      <span>{ordinal}</span>
      {suitImageMap[suit]}
      <span>{ordinal}</span>
    </Styles>
  );
}

export default Card;
