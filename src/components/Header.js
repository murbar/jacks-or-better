import React from 'react';
import styled from 'styled-components';
import { slideInDown } from 'styles/animations';
import { mediaQuery } from 'styles/helpers';
import { playSound } from 'soundFx';
import { ReactComponent as LogoImage } from 'images/logo.svg';
import { ReactComponent as SoundOnImage } from 'images/sound-on-icon.svg';
import { ReactComponent as SoundOffImage } from 'images/sound-off-icon.svg';

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
  left: calc(50% - calc(var(--w) / 2));
  animation: ${slideInDown} 0.75s;
  svg {
    width: 100%;
    height: auto;
  }
`;

const SoundControl = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  padding: 1rem;
  svg {
    color: ${p => p.theme.colors.primary};
    width: 1.5em;
    height: auto;
  }
  ${mediaQuery.above.phone`
    right: 15rem;
  `}
`;

export default function Header({ playerState, toggleSoundMute }) {
  const isSoundOn = playerState.soundFxOn;

  const toggleMute = () => {
    if (!isSoundOn) playSound('cardTap');
    toggleSoundMute();
  };

  return (
    <Styles>
      <h1>Jacks or Better Video Poker Game</h1>
      <Logo>
        <LogoImage />
      </Logo>
      <SoundControl
        onClick={toggleMute}
        role="switch"
        aria-checked={isSoundOn ? 'true' : 'false'}
      >
        {isSoundOn ? <SoundOnImage /> : <SoundOffImage />}
      </SoundControl>
    </Styles>
  );
}
