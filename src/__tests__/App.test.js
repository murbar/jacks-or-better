import React from 'react';
import ReactDOM from 'react-dom';
import '__mocks__/AudioContext.mock';
import '__mocks__/crypto.mock';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from 'styles/theme';

import App from '../App';

export const withContexts = (Component, props) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>
        <Component {...props} />
      </ThemeProvider>
    </MemoryRouter>
  );
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withContexts(App), div);
  ReactDOM.unmountComponentAtNode(div);
});
