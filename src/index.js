import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/theme';
import GlobalStyles from 'styles/global';
import App from './App';
import ErrorBoundary from 'components/ErrorBoundary';

const themes = {
  default: defaultTheme
};

const Root = () => {
  const [theme, setTheme] = React.useState(defaultTheme);

  const changeTheme = name => {
    if (name in themes) {
      setTheme(themes[name]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <GlobalStyles />
        <App changeTheme={changeTheme} />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
