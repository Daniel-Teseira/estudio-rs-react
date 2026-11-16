/** Devuelve los parámetros (por ejemplo { slug }) si la ruta coincide, o null. "*" coincide siempre. */
export const matchPath = (pattern, pathname) => {
  if (pattern === '*') return {};
  const expected = pattern.split('/').filter(Boolean);
  const actual = pathname.split('/').filter(Boolean);
  if (expected.length !== actual.length) return null;
  const params = {};
  for (const [index, segment] of expected.entries()) {
    if (segment.startsWith(':')) {
      try {
        params[segment.slice(1)] = decodeURIComponent(actual[index]);
      } catch {
        return null;
      }
    } else if (segment !== actual[index]) {
      return null;
    }
  }
  return params;
};

export default matchPath;
