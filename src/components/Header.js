import React from 'react';
import styled from 'styled-components';
import { introLogo } from 'styles/animations';
import { ReactComponent as LogoImage } from 'images/logo.svg';
import { mediaQuery } from 'styles/helpers';

const Styles = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  h1 {
    color: transparent;
    font-size: 0.5em;
  }
`;

const Logo = styled.div`
  --w: 10rem;
  width: var(--w);
  position: absolute;
  top: 1rem;
  left: calc(50% - (var(--w) / 2));
  svg {
    width: 100%;
    height: auto;
  }
  ${introLogo}
  ${mediaQuery.above.px450`
    --w: 14rem;
  `}
`;

export default function Header() {
  return (
    <Styles>
      <h1>Jacks or Better 9/6 Video Poker Game</h1>
      <Logo>
        <LogoImage />
      </Logo>
    </Styles>
  );
}
