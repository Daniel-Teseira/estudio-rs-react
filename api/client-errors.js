const recentReports = new Map();
const maxReportsPerMinute = 30;
const maxPayloadBytes = 6000;

const respond = (response, statusCode) => {
  response.status(statusCode).end();
};

const parseBody = (body) => {
  if (typeof body === 'string') return JSON.parse(body);
  if (Buffer.isBuffer(body)) return JSON.parse(body.toString('utf8'));
  return body;
};

const clean = (value, limit) => (typeof value === 'string' ? value.slice(0, limit) : '');

export default function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return respond(response, 405);
  }

  const origin = request.headers.origin;
  const host = request.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return respond(response, 403);
    } catch {
      return respond(response, 403);
    }
  }

  let body;
  try {
    const rawBody = typeof request.body === 'string' ? request.body : JSON.stringify(request.body ?? {});
    if (Buffer.byteLength(rawBody, 'utf8') > maxPayloadBytes) return respond(response, 413);
    body = parseBody(request.body);
  } catch {
    return respond(response, 400);
  }

  const now = Date.now();
  const clientKey = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const reportWindow = recentReports.get(clientKey);
  if (reportWindow && now - reportWindow.startedAt < 60_000 && reportWindow.count >= maxReportsPerMinute) {
    return respond(response, 429);
  }
  if (!reportWindow || now - reportWindow.startedAt >= 60_000) {
    if (recentReports.size >= 1000) recentReports.delete(recentReports.keys().next().value);
    recentReports.set(clientKey, { startedAt: now, count: 1 });
  } else {
    reportWindow.count += 1;
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) return respond(response, 400);
  const pathname = clean(body.pathname, 160).split('?')[0];
  if (body.category === 'performance') {
    const allowedMetrics = ['fcpMs', 'lcpMs', 'ttfbMs', 'domContentLoadedMs', 'loadMs', 'cls', 'maxInteractionMs'];
    const metrics = {};
    for (const key of allowedMetrics) {
      const value = body.metrics?.[key];
      if (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 600_000) {
        metrics[key] = Math.round(value * 10) / 10;
      }
    }
    console.log('client_performance', JSON.stringify({ pathname: pathname.startsWith('/') ? pathname : '/', metrics, timestamp: new Date(now).toISOString() }));
    return respond(response, 204);
  }

  console.error('client_error', JSON.stringify({
    category: clean(body.category, 40),
    name: clean(body.name, 100),
    message: clean(body.message, 300),
    stack: clean(body.stack, 1200),
    pathname: pathname.startsWith('/') ? pathname : '/',
    timestamp: new Date(now).toISOString(),
  }));
  return respond(response, 204);
}
