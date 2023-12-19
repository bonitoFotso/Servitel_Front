import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from './ErrorBoundary';  // Importez le composant ErrorBoundary

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
