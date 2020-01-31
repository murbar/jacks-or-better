import React from 'react';
import styled from 'styled-components';

const faces = {
  '1': 'A',
  '11': 'J',
  '12': 'Q',
  '13': 'K'
};

const Styles = styled.div`
  width: 8rem;
  height: 12rem;
  margin: 1rem;
  padding: 1rem;
  font-family: Montserrat;
  line-height: 1;
  font-size: 2rem;
  color: ${p => ('HD'.includes(p.suit) ? p.theme.colors.red : p.theme.colors.offBlack)};
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background: white;
`;

function Card({ value }) {
  let ordinal = value.slice(0, -1);
  ordinal = faces[ordinal] ? faces[ordinal] : ordinal;
  const suit = value.slice(-1);
  return <Styles suit={suit}>{ordinal}</Styles>;
}

export default Card;
