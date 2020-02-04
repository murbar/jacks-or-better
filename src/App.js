import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Game from 'components/Game';
import { DEVICE_SIZES } from 'styles/helpers';

const Styles = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  max-width: ${DEVICE_SIZES.desktop}px;
  min-width: 360px;
  font-size: 1em;
`;

function App() {
  return (
    <Styles>
      <Header />
      <Game />
    </Styles>
  );
}

export default App;
