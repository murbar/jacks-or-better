import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import Game from 'components/Game';

const Styles = styled.div`
  margin: 0 2rem;
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
