import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';

const Styles = styled.div`
  margin: 0 2rem;
`;

function App() {
  return (
    <Styles>
      <Header />
      <p>
        January 2020 - is it{' '}
        <a href="https://github.com/facebook/create-react-app/releases">up to date</a>?
      </p>
      <ul>
        <li>No cruft</li>
        <li>Styled components - global styles, theme, helpers</li>
        <li>"Source Sans Pro" font face</li>
      </ul>
    </Styles>
  );
}

export default App;
