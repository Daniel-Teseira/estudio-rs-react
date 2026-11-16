import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Router } from './router';
import '@fontsource/quattrocento/400.css';
import './styles/base.css';
import './styles/tokens.css';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { initializeClientErrorMonitoring, initializeContactTracking } from './monitoring/clientErrors';
import { initializePerformanceMonitoring } from './monitoring/performanceMetrics';

initializeClientErrorMonitoring();
initializeContactTracking();
initializePerformanceMonitoring();

const rootElement = document.getElementById('root');
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
