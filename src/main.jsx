import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/quattrocento/400.css';
import './styles/bootstrap.scss';
import './styles/tokens.css';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { initializeClientErrorMonitoring } from './monitoring/clientErrors';
import { initializePerformanceMonitoring } from './monitoring/performanceMetrics';

initializeClientErrorMonitoring();
initializePerformanceMonitoring();

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
