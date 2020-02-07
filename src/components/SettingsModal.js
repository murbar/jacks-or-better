import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from 'images/settings-icon.svg';
import Button from 'components/Button';
import FullScreenModal from 'components/FullScreenModal';
import { mediaQuery, effect3dSmall } from 'styles/helpers';
import { playSound } from 'soundFx';

const SettingsModalControl = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  padding: 1rem;
  cursor: pointer;
  svg {
    color: ${p => p.theme.colors.primary};
    width: 1.5em;
    height: auto;
  }
  ${mediaQuery.above.phone`
    right: 15rem;
  `}
`;

const Styles = styled.div`
  width: 100%;
  padding: 1rem;
  h2 {
    font-size: 2em;
    color: ${p => p.theme.colors.gold};
    margin-top: 0;
    text-align: center;
    ${p => effect3dSmall(p.theme.colors.gold)};
  }

  ul {
    padding-left: 3rem;
  }
  li {
    font-size: 0.9em;
    margin-bottom: 0.5rem;
  }

  kbd {
    font-size: 1.25em;
    background: ${p => p.theme.textColor};
    color: ${p => p.theme.backgroundColor};
    padding: 0.15em 0.35em;
    border-radius: 0.25em;
  }
`;

export default function AboutModal({ isShowing = false, playerState, toggleSoundMute }) {
  const [showModal, setShowModal] = useState(isShowing);

  useEffect(() => {
    setShowModal(isShowing);
  }, [isShowing]);

  const isSoundOn = playerState.soundFxOn;

  const toggleMute = () => {
    if (!isSoundOn) playSound('cardTap');
    toggleSoundMute();
  };

  return (
    <>
      <SettingsModalControl
        onClick={() => setShowModal(true)}
        role="switch"
        aria-checked={showModal ? 'true' : 'false'}
        title="Show settings"
      >
        <SettingsIcon />
      </SettingsModalControl>

      <FullScreenModal onClickOff={() => setShowModal(false)} isShowing={showModal}>
        <Styles>
          <h2>Settings</h2>
          <p>Card color</p>
          <p>Table color</p>
          <p>
            Sound on <input type="checkbox" onChange={toggleMute} checked={isSoundOn} />{' '}
          </p>
          <div>
            <Button onClick={() => setShowModal(false)} title="Dismiss settings">
              Done
            </Button>
          </div>
        </Styles>
      </FullScreenModal>
    </>
  );
}
