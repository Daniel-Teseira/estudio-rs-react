import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import getResponsiveImageProps from '../../utils/responsiveImage';
import './Carrusel.css';

const INTERVAL = 7500;

const slides = [
  { image: 'justice-gavel', alt: 'Mazo judicial junto a una persona redactando un documento' },
  { image: 'law-books', alt: 'Colección de libros jurídicos' },
  { image: 'public-demonstration', alt: 'Personas reunidas en una manifestación' },
];

const subscribeToMotion = (callback) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};
const subscribeToVisibility = (callback) => {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
};

/** Preferencias del navegador; en el prerender se asume movimiento permitido y página visible. */
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
const usePageHidden = () =>
  useSyncExternalStore(
    subscribeToVisibility,
    () => document.hidden,
    () => false,
  );

export const Carrusel = () => {
  const [index, setIndex] = useState(0);
  // Se cargan la diapositiva visible, la siguiente y las ya vistas.
  const [visited, setVisited] = useState(() => new Set([0]));
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const pageHidden = usePageHidden();
  const playing = !userPaused && !reducedMotion;
  const advancing = playing && !hovered && !focused && !pageHidden;

  const goTo = useCallback((target) => {
    const next = (target + slides.length) % slides.length;
    setIndex(next);
    setVisited((previous) => new Set(previous).add(next));
  }, []);

  useEffect(() => {
    if (!advancing) return undefined;
    const timer = window.setTimeout(() => goTo(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [advancing, index, goTo]);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') goTo(index + 1);
    if (event.key === 'ArrowLeft') goTo(index - 1);
  };

  return (
    // eslint-disable-next-line jsx-a11y-x/no-noninteractive-element-interactions
    <section
      className="hero-carousel"
      aria-roledescription="carrusel"
      aria-label="Presentación del estudio"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Mientras avanza solo no se anuncia cada cambio; al controlarlo a mano, sí. */}
      <div className="hero-carousel__slides" aria-live={advancing ? 'off' : 'polite'}>
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const shouldLoad = visited.has(slideIndex) || slideIndex === (index + 1) % slides.length;
          return (
            <div
              key={slide.image}
              className={`hero-carousel__slide${active ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${slideIndex + 1} de ${slides.length}`}
              aria-hidden={!active}
            >
              {shouldLoad && (
                <img
                  {...getResponsiveImageProps(slide.image, '100vw')}
                  className="hero-carousel__image"
                  alt={slide.alt}
                  {...(slideIndex === 0 ? { fetchPriority: 'high' } : { fetchPriority: 'low', decoding: 'async' })}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="hero-carousel__caption">
        <div className="hero-carousel__panel">
          <p className="hero-carousel__eyebrow">Estudio Jurídico RS</p>
          <h1 className="hero-carousel__title">Asesoramiento jurídico con seriedad y compromiso.</h1>
          <p className="hero-carousel__description">
            Conozca nuestras áreas de práctica y comuníquese con el estudio para iniciar una consulta.
          </p>
        </div>
      </div>

      <div className="hero-carousel__controls">
        <button
          type="button"
          className="hero-carousel__button"
          aria-label="Imagen anterior"
          onClick={() => goTo(index - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        {!reducedMotion && (
          <button
            type="button"
            className="hero-carousel__button"
            aria-label={userPaused ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
            aria-pressed={userPaused}
            onClick={() => setUserPaused((paused) => !paused)}
          >
            {userPaused ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path className="hero-carousel__icon-fill" d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5v14M15 5v14" />
              </svg>
            )}
          </button>
        )}
        <button
          type="button"
          className="hero-carousel__button"
          aria-label="Imagen siguiente"
          onClick={() => goTo(index + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
        <div className="hero-carousel__indicators">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.image}
              type="button"
              className={`hero-carousel__indicator${slideIndex === index ? ' is-active' : ''}`}
              aria-label={`Mostrar imagen ${slideIndex + 1}`}
              aria-current={slideIndex === index ? 'true' : undefined}
              onClick={() => goTo(slideIndex)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carrusel;
