import { reportPerformanceMetrics } from './clientErrors';

const round = (value) => Math.round(value * 10) / 10;

export const initializePerformanceMonitoring = () => {
  if (!import.meta.env.PROD || typeof window === 'undefined' || !window.PerformanceObserver) return;

  const initialPathname = window.location.pathname;
  const metrics = {};
  let largestContentfulPaint = 0;
  let cumulativeLayoutShift = 0;
  let maxInteractionMs = 0;
  let sent = false;

  const observe = (type, callback, options = {}) => {
    try {
      const observer = new PerformanceObserver((list) => callback(list.getEntries()));
      observer.observe({ type, buffered: true, ...options });
    } catch {
      // Some browsers do not expose every performance entry type.
    }
  };

  observe('largest-contentful-paint', (entries) => {
    for (const entry of entries) largestContentfulPaint = Math.max(largestContentfulPaint, entry.startTime);
  });
  observe('layout-shift', (entries) => {
    for (const entry of entries) {
      if (!entry.hadRecentInput) cumulativeLayoutShift += entry.value;
    }
  });
  observe(
    'event',
    (entries) => {
      for (const entry of entries) {
        if (entry.interactionId) maxInteractionMs = Math.max(maxInteractionMs, entry.duration);
      }
    },
    { durationThreshold: 40 },
  );
  observe('paint', (entries) => {
    const firstContentfulPaint = entries.find((entry) => entry.name === 'first-contentful-paint');
    if (firstContentfulPaint) metrics.fcpMs = round(firstContentfulPaint.startTime);
  });

  const sendOnce = () => {
    if (sent) return;
    sent = true;
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      metrics.ttfbMs = round(navigation.responseStart - navigation.startTime);
      metrics.domContentLoadedMs = round(navigation.domContentLoadedEventEnd - navigation.startTime);
      metrics.loadMs = round(navigation.loadEventEnd - navigation.startTime);
    }
    if (largestContentfulPaint) metrics.lcpMs = round(largestContentfulPaint);
    metrics.cls = round(cumulativeLayoutShift);
    if (maxInteractionMs) metrics.maxInteractionMs = round(maxInteractionMs);
    reportPerformanceMetrics(metrics, initialPathname);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sendOnce();
  });
  window.addEventListener('pagehide', sendOnce, { once: true });
  const scheduleReport = () => window.setTimeout(sendOnce, 10_000);
  if (document.readyState === 'complete') scheduleReport();
  else window.addEventListener('load', scheduleReport, { once: true });
};

export default initializePerformanceMonitoring;
