import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import config from 'config';
import useLocalStorageState from 'hooks/useLocalStorageState';
import { DEVICE_SIZES } from 'styles/helpers';
import { withUserPreferences } from 'styles/theme';
import { recordPageView, initializeGA } from 'analytics';
import GlobalStyles from 'styles/global';
import Header from 'components/Header';
import Game from 'components/Game';
import SettingsModal from 'components/SettingsModal';
import AboutModal from 'components/AboutModal';

initializeGA();

const Styles = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: ${DEVICE_SIZES.px1100}px;
  min-width: 360px;
  font-size: 1em;
`;

function App() {
  const [playerState, setPlayerState] = useLocalStorageState(
    config.storageKeys.playerState,
    config.initPlayerState
  );
  const [theme, setTheme] = React.useState(
    withUserPreferences({
      tableColor: playerState.tableColor,
      cardColor: playerState.cardColor
    })
  );

  React.useEffect(() => {
    setTheme(
      withUserPreferences({
        tableColor: playerState.tableColor,
        cardColor: playerState.cardColor
      })
    );
  }, [playerState.tableColor, playerState.cardColor]);

  const incrementBank = React.useCallback(
    points => {
      setPlayerState(prev => ({ ...prev, bank: prev.bank + points }));
    },
    [setPlayerState]
  );

  const toggleSoundMute = () => {
    setPlayerState(prev => ({ ...prev, soundFxOn: !prev.soundFxOn }));
  };

  const setTableColor = name => {
    setPlayerState(prev => ({ ...prev, tableColor: name }));
  };

  const setCardColor = name => {
    setPlayerState(prev => ({ ...prev, cardColor: name }));
  };

  recordPageView('/');
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styles>
        <Header />
        <SettingsModal
          playerState={playerState}
          actions={{ toggleSoundMute, setTableColor, setCardColor }}
        />
        <AboutModal />
        <Game
          playerState={playerState}
          playerActions={{ toggleSoundMute, incrementBank }}
        />
      </Styles>
    </ThemeProvider>
  );
}

export default App;
