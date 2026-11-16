const endpoint = '/api/client-errors';

const sendReport = (payload) => {
  try {
    if (navigator.sendBeacon?.(endpoint, new Blob([payload], { type: 'application/json' }))) return;
  } catch {
    // A rejected beacon can still be sent with fetch.
  }
  try {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => {});
  } catch {
    // Reporting must never interrupt the site.
  }
};

const errorDetails = (error) => {
  if (error instanceof Error) {
    return { name: error.name, message: error.message, stack: error.stack };
  }
  if (error && typeof error === 'object') {
    return {
      name: typeof error.name === 'string' ? error.name : 'Error',
      message: typeof error.message === 'string' ? error.message : String(error),
      stack: typeof error.stack === 'string' ? error.stack : '',
    };
  }
  return { name: 'Error', message: String(error) };
};

export const reportClientError = (error, category = 'error') => {
  if (!import.meta.env.PROD || typeof window === 'undefined') return;

  const details = errorDetails(error);
  const payload = JSON.stringify({
    category: String(category).slice(0, 40),
    name: details.name.slice(0, 100),
    message: details.message.slice(0, 300),
    stack: (details.stack || '').slice(0, 400),
    pathname: window.location.pathname.slice(0, 160),
  });

  sendReport(payload);
};

export const reportPerformanceMetrics = (metrics, pathname = window.location.pathname) => {
  if (!import.meta.env.PROD || typeof window === 'undefined') return;
  const payload = JSON.stringify({
    category: 'performance',
    pathname,
    metrics,
  });
  sendReport(payload);
};

export const initializeClientErrorMonitoring = () => {
  if (!import.meta.env.PROD || typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    reportClientError(event.error || event.message, 'error');
  });
  window.addEventListener('unhandledrejection', (event) => {
    reportClientError(event.reason, 'unhandled-rejection');
  });
};
