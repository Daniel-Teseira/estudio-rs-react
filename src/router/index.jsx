/* eslint-disable react-refresh/only-export-components */
// Router mínimo para las pocas rutas del sitio. Reemplaza a React Router (unos 36 KB
// del bundle) con la misma API que se usaba: <Router>, <Routes>, <Route>, <Navigate>,
// <Link>, useLocation, useNavigate, useNavigationType, useParams y useSearchParams.
import { Children, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import matchPath from './matchPath';

export { matchPath };

const RouterContext = createContext(null);
const ParamsContext = createContext({});

const parseLocation = (url) => {
  const { pathname, search } = new URL(url, 'http://localhost');
  return { pathname, search };
};

/**
 * En el navegador sigue la URL real (history API). Con `location` queda fijo en esa
 * dirección: así se usa en el prerender, donde no hay window.
 */
export const Router = ({ location: staticLocation, children }) => {
  const [state, setState] = useState(() => ({
    location: parseLocation(staticLocation ?? window.location.pathname + window.location.search),
    navigationType: 'POP',
  }));

  useEffect(() => {
    if (staticLocation) return undefined;
    const handlePopState = () =>
      setState({ location: parseLocation(window.location.pathname + window.location.search), navigationType: 'POP' });
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [staticLocation]);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const next = parseLocation(to);
    window.history[replace ? 'replaceState' : 'pushState'](null, '', next.pathname + next.search);
    setState({ location: next, navigationType: replace ? 'REPLACE' : 'PUSH' });
  }, []);

  const value = useMemo(() => ({ ...state, navigate }), [state, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

const useRouter = () => {
  const router = useContext(RouterContext);
  if (!router) throw new Error('Los componentes de navegación tienen que estar dentro de <Router>.');
  return router;
};

/** Solo describe una ruta; <Routes> elige cuál mostrar. */
export const Route = () => null;

export const Routes = ({ children }) => {
  const { location } = useRouter();
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    const params = matchPath(child.props.path, location.pathname);
    if (params) return <ParamsContext.Provider value={params}>{child.props.element}</ParamsContext.Provider>;
  }
  return null;
};

export const Navigate = ({ to, replace = false }) => {
  const { navigate } = useRouter();
  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, to, replace]);
  return null;
};

export const Link = ({ to, onClick, target, children, ...props }) => {
  const { navigate } = useRouter();
  const handleClick = (event) => {
    onClick?.(event);
    // Clic con modificadores, botón del medio o target: lo resuelve el navegador.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target && target !== '_self')
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} target={target} {...props} onClick={handleClick}>
      {children}
    </a>
  );
};

export const useLocation = () => useRouter().location;
export const useNavigate = () => useRouter().navigate;
export const useNavigationType = () => useRouter().navigationType;
export const useParams = () => useContext(ParamsContext);
export const useSearchParams = () => {
  const { search } = useLocation();
  return [useMemo(() => new URLSearchParams(search), [search])];
};
