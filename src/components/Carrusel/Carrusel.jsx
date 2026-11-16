import { useEffect, useRef } from 'react';
import Image from '../../images/image.js';
import getResponsiveImageProps from '../../utils/responsiveImage';
import './Carrusel.css';

export const Carrusel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return undefined;

    let disposed = false;
    let cleanup;

    import('bootstrap/js/dist/carousel').then(({ default: Carousel }) => {
      if (disposed) return;

      const carousel = Carousel.getOrCreateInstance(element, {
        interval: 7500,
        pause: false,
      });
      const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
      let mouseInside = false;
      let focusInside = false;

      const updatePlayback = () => {
        if (motionPreference.matches || document.hidden || mouseInside || focusInside) {
          carousel.pause();
        } else {
          carousel.cycle();
        }
      };

      const handleMouseEnter = () => {
        mouseInside = true;
        updatePlayback();
      };

      const handleMouseLeave = () => {
        mouseInside = false;
        updatePlayback();
      };

      const handleFocusIn = () => {
        focusInside = true;
        updatePlayback();
      };

      const handleFocusOut = (event) => {
        if (!element.contains(event.relatedTarget)) {
          focusInside = false;
          updatePlayback();
        }
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('focusin', handleFocusIn);
      element.addEventListener('focusout', handleFocusOut);
      document.addEventListener('visibilitychange', updatePlayback);
      motionPreference.addEventListener('change', updatePlayback);
      updatePlayback();

      cleanup = () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('focusin', handleFocusIn);
        element.removeEventListener('focusout', handleFocusOut);
        document.removeEventListener('visibilitychange', updatePlayback);
        motionPreference.removeEventListener('change', updatePlayback);
        carousel.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className='carrusel estilo' aria-label='Presentación del estudio'>
      <div
        id='carouselExampleInterval'
        ref={carouselRef}
        className='carousel slide'
        aria-roledescription='carrusel'
        aria-live='off'
      >
        <div className='carousel-inner'>
          <div className='carousel-item active' data-bs-interval='7500' aria-roledescription='diapositiva'>
            <img
              {...getResponsiveImageProps(Image.carousel1, '100vw')}
              className='d-block w-100 imag'
              alt='Mazo judicial junto a una persona redactando un documento'
              fetchpriority='high'
            />
          </div>

          <div className='carousel-item' aria-roledescription='diapositiva'>
            <img
              {...getResponsiveImageProps(Image.carousel2, '100vw')}
              className='d-block w-100 imag'
              alt='Colección de libros jurídicos'
              loading='lazy'
              decoding='async'
            />
          </div>

          <div className='carousel-item' aria-roledescription='diapositiva'>
            <img
              {...getResponsiveImageProps(Image.carousel3, '100vw')}
              className='d-block w-100 imag'
              alt='Personas reunidas en una manifestación'
              loading='lazy'
              decoding='async'
            />
          </div>

          <div className='carousel-caption'>
            <div className='carousel-caption__panel'>
              <p className='carousel-caption__eyebrow'>Estudio Jurídico RS</p>
              <h1 className='texto'>Asesoramiento jurídico con seriedad y compromiso.</h1>
              <p className='carousel-caption__description'>
                Conozca nuestras áreas de práctica y comuníquese con el estudio para iniciar una consulta.
              </p>
            </div>
          </div>
        </div>

        <button
          className='carousel-control-prev'
          type='button'
          aria-label='Imagen anterior'
          data-bs-target='#carouselExampleInterval'
          data-bs-slide='prev'
        >
          <span className='carousel-control-prev-icon' aria-hidden='true' />
          <span className='visually-hidden'>Anterior</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          aria-label='Imagen siguiente'
          data-bs-target='#carouselExampleInterval'
          data-bs-slide='next'
        >
          <span className='carousel-control-next-icon' aria-hidden='true' />
          <span className='visually-hidden'>Siguiente</span>
        </button>
      </div>
    </section>

  );
};

export default Carrusel;
