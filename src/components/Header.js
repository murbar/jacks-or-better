import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoSVG } from 'images/logo.svg';
import { slideInDown } from 'styles/animations';

const Styles = styled.header`
  --w: 8rem;
  justify-content: center;
  color: transparent;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 1rem;
  h1 {
    font-size: 0.5em;
  }
  svg {
    width: var(--w);
    height: auto;
    position: absolute;
    top: 0.5rem;
    left: calc(50% - calc(var(--w) / 2));
    animation: ${slideInDown} 0.75s;
  }
`;

export default function Header() {
  return (
    <Styles>
      <h1>Jacks or Better Video Poker Game</h1>
      <LogoSVG />
    </Styles>
  );
}
