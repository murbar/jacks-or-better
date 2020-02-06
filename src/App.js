import React from 'react';
import styled from 'styled-components';
import { recordPageView, initializeGA } from 'analytics';
import { DEVICE_SIZES } from 'styles/helpers';
import config from 'config';
import useLocalStorageState from 'hooks/useLocalStorageState';
import Header from 'components/Header';
import Game from 'components/Game';

initializeGA();

const Styles = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: ${DEVICE_SIZES.px1100}px;
  min-width: 360px;
  font-size: 1em;
`;

function App({ changeTheme }) {
  const [playerState, setPlayerState] = useLocalStorageState(
    config.storageKeys.playerState,
    config.initPlayerState
  );

  const toggleSoundMute = () => {
    setPlayerState(prev => ({ ...prev, soundFxOn: !prev.soundFxOn }));
  };

  const incrementBank = React.useCallback(
    points => {
      setPlayerState(prev => ({ ...prev, bank: prev.bank + points }));
    },
    [setPlayerState]
  );

  recordPageView('/');
  return (
    <Styles>
      <Header playerState={playerState} toggleSoundMute={toggleSoundMute} />
      <Game
        playerState={playerState}
        playerActions={{ toggleSoundMute, incrementBank }}
      />
    </Styles>
  );
}

export default App;
