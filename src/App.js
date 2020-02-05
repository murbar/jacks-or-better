import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Game from 'components/Game';
import { DEVICE_SIZES } from 'styles/helpers';

const Styles = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  max-width: ${DEVICE_SIZES.px1100}px;
  min-width: 360px;
  font-size: 1em;
`;

function App({ changeTheme }) {
  return (
    <Styles>
      <Header />
      <Game changeTheme={changeTheme} />
    </Styles>
  );
}

export default App;
