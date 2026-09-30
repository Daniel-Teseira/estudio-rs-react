import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Data from '../../json/Data.json';
import serviceSlug from '../../utils/serviceSlug';
import { usePageTransition } from '../../context/PageTransitionContext';
import './ServicePage.css';

const ServicePage = () => {
  const { slug } = useParams();
  const { phase, hasEntered } = usePageTransition();
  const service = Data.find((item) => serviceSlug(item.title) === slug);
  const showService = hasEntered || phase === 'revealing';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/error" replace />;
  }

  return (
    <main className="service-page" aria-busy={!showService}>
      <section
        className={`service-hero${showService ? ' service-hero--revealed' : ''}`}
        aria-labelledby="service-title"
      >
        <img
          className="service-hero__image"
          src={service.picture}
          alt={`Servicio de ${service.title}`}
        />
        <div className="service-hero__shade" />
        <div className="container service-hero__content">
          <p className="service-page__eyebrow">Áreas de práctica</p>
          <h1 className="service-hero__title" id="service-title">{service.title}</h1>
        </div>
      </section>

      <section className={`service-description${showService ? ' service-description--revealed' : ''}`}>
        <div className="container service-description__layout">
          <p className="service-description__eyebrow">Servicio legal</p>
          <p className="service-description__text">{service.description}</p>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
