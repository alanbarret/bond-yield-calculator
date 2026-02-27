import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Application Entry Point
 * 
 * Mounts the React application to the DOM.
 * StrictMode enables additional checks and warnings during development.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
