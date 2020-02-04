import React from 'react';
import ReactDOM from 'react-dom';
import '__mocks__/AudioContext.mock';
import '__mocks__/crypto.mock';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/theme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
