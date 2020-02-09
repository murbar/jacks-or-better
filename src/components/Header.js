import React from 'react';
import styled from 'styled-components';
import { slideInDown } from 'styles/animations';
import { ReactComponent as LogoImage } from 'images/logo.svg';

const Styles = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  h1 {
    color: transparent;
    font-size: 0.5em;
  }
`;

const Logo = styled.div`
  --w: 8rem;
  width: var(--w);
  position: absolute;
  top: 0.5rem;
  left: calc(50% - (var(--w) / 2));
  animation: ${slideInDown} 0.75s;
  svg {
    width: 100%;
    height: auto;
  }
`;

export default function Header() {
  return (
    <Styles>
      <h1>Jacks or Better Video Poker Game</h1>
      <Logo>
        <LogoImage />
      </Logo>
    </Styles>
  );
}
