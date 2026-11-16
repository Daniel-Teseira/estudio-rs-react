import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import './PageTransition.css';

const COVER_DURATION = 180;
const REVEAL_DURATION = 180;

const PageTransitionContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const usePageTransition = () => useContext(PageTransitionContext);

/**
 * Cada página nueva empieza arriba. Al volver con atrás/adelante (POP)
 * se deja que el navegador restaure la posición anterior.
 */
const useScrollToTopOnNavigate = (pathname) => {
  const navigationType = useNavigationType();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (navigationType !== 'POP') {
      // "instant" evita el desplazamiento suave que Bootstrap activa en :root.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, navigationType]);
};

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [phase, setPhase] = useState('idle');
  const [hasEntered, setHasEntered] = useState(true);
  const [animatedPath, setAnimatedPath] = useState(null);
  const timers = useRef([]);
  const transitionId = useRef(0);
  useScrollToTopOnNavigate(pathname);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback((callback, delay, id) => {
    const timer = window.setTimeout(() => {
      if (transitionId.current === id) callback();
    }, delay);
    timers.current.push(timer);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const navigateWithTransition = useCallback(
    (to) => {
      if (phase !== 'idle' || to === pathname + search) return;

      clearTimers();
      const id = ++transitionId.current;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const destinationPath = to.split('?')[0];
      setAnimatedPath(destinationPath);

      if (reduceMotion || destinationPath === pathname) {
        navigate(to);
        return;
      }

      setHasEntered(false);
      setPhase('covering');

      // La página ya está cargada: se navega en cuanto la cortina cubre la pantalla.
      schedule(
        () => {
          navigate(to);
          setPhase('revealing');
          schedule(
            () => {
              setHasEntered(true);
              setPhase('idle');
            },
            REVEAL_DURATION,
            id,
          );
        },
        COVER_DURATION,
        id,
      );
    },
    [clearTimers, navigate, pathname, search, phase, schedule],
  );

  return (
    <PageTransitionContext.Provider value={{ phase, hasEntered, animatedPath, navigateWithTransition }}>
      {children}
      <div className={`page-transition-curtain page-transition-curtain--${phase}`} aria-hidden="true" />
    </PageTransitionContext.Provider>
  );
};
