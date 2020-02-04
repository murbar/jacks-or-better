import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from 'styles/theme';
import GlobalStyles from 'styles/global';
import App from './App';

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
      <>
        <GlobalStyles />
        <App changeTheme={changeTheme} />
      </>
    </ThemeProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
