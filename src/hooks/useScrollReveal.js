import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Animación de aparición al hacer scroll, sin ocultar contenido de más:
 * - En el HTML prerenderizado (o sin JavaScript) el elemento se ve siempre ("static").
 * - Al hidratar, solo se oculta ("pending") si está debajo de lo que se ve en pantalla,
 *   y aparece ("visible") cuando llega al viewport.
 */
const useScrollReveal = () => {
  const ref = useRef(null);
  const [state, setState] = useState('static');

  // useLayoutEffect: se decide antes del primer pintado para que no parpadee.
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    setState('pending');
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (state !== 'pending' || !element) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [state]);

  return { ref, state };
};

export default useScrollReveal;
