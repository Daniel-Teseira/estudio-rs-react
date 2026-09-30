import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PageTransition.css';

const COVER_DURATION = 500;
const SIMULATED_LOAD_DURATION = 500;
const REVEAL_DURATION = 1150;

const PageTransitionContext = createContext(null);

export const usePageTransition = () => useContext(PageTransitionContext);

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [phase, setPhase] = useState('idle');
  const [hasEntered, setHasEntered] = useState(true);
  const [animatedPath, setAnimatedPath] = useState(null);
  const timers = useRef([]);
  const transitionId = useRef(0);

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

  const navigateWithTransition = useCallback((to) => {
    if (phase !== 'idle' || to === pathname) return;

    clearTimers();
    const id = ++transitionId.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setHasEntered(false);
    setAnimatedPath(to);

    if (reduceMotion) {
      navigate(to);
      setHasEntered(true);
      return;
    }

    setPhase('covering');

    schedule(() => {
      navigate(to);
      setPhase('loading');

      schedule(() => {
        setPhase('revealing');
        schedule(() => {
          setHasEntered(true);
          setPhase('idle');
        }, REVEAL_DURATION, id);
      }, SIMULATED_LOAD_DURATION, id);
    }, COVER_DURATION, id);
  }, [clearTimers, navigate, pathname, phase, schedule]);

  return (
    <PageTransitionContext.Provider value={{ phase, hasEntered, animatedPath, navigateWithTransition }}>
      {children}
      <div
        className={`page-transition-curtain page-transition-curtain--${phase}`}
        aria-hidden="true"
      />
    </PageTransitionContext.Provider>
  );
};
