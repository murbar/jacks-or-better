import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as SettingsIcon } from 'images/settings-icon.svg';
import Button from 'components/Button';
import FullScreenModal from 'components/FullScreenModal';
import { effect3dSmall } from 'styles/helpers';
import { playSound } from 'soundFx';
import ColorChoiceToggle from 'components/ColorChoiceToggle';
import { cardOptions, tableOptions } from 'styles/theme';

delete cardOptions.default;
delete tableOptions.default;

const SettingsModalControl = styled.div`
  padding: 1rem;
  cursor: pointer;
  svg {
    color: ${p => p.theme.colors.primary};
    width: 1.5em;
    height: auto;
  }
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
`;

export default function AboutModal({ playerState, actions }) {
  const { toggleSoundMute, setTableColor, setCardColor } = actions;
  const isSoundOn = playerState.soundFxOn;
  const history = useHistory();
  const routeMatch = useRouteMatch('/settings');
  const showModal = routeMatch && routeMatch.isExact;

  const toggleMute = () => {
    if (!isSoundOn) playSound('cardTap');
    toggleSoundMute();
  };

  return (
    <>
      <Link to="/settings">
        <SettingsModalControl
          role="switch"
          aria-checked={showModal ? 'true' : 'false'}
          title="Show Settings"
        >
          <SettingsIcon />
        </SettingsModalControl>
      </Link>

      <FullScreenModal onClickOff={() => history.push('/')} isShowing={showModal}>
        <Styles>
          <h2>Settings</h2>
          <h3>Cards</h3>
          <ColorChoiceToggle
            choices={cardOptions}
            initialChoice={playerState.cardColor}
            onToggle={setCardColor}
          />
          <h3>Table</h3>
          <ColorChoiceToggle
            choices={tableOptions}
            initialChoice={playerState.tableColor}
            onToggle={setTableColor}
          />
          <h3>Sound</h3>

          <Button
            onClick={toggleMute}
            title="Toggle sound on/off"
            className={!isSoundOn && 'disabled'}
          >
            {isSoundOn ? 'Turn Off' : 'Turn On'}
          </Button>
        </Styles>
      </FullScreenModal>
    </>
  );
}
