import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary';
import App from './App';

const Root = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
};
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Root />);
