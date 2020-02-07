import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from 'components/ErrorBoundary';
import App from './App';

const Root = () => {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
