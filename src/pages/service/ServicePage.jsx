import { useParams } from '../../router';
import services from '../../data/services.json';
import { usePageTransition } from '../../context/PageTransitionContext';
import usePageMetadata from '../../hooks/usePageMetadata';
import getResponsiveImageProps from '../../utils/responsiveImage';
import whatsappUrl from '../../utils/whatsapp';
import TransitionLink from '../../components/TransitionLink/TransitionLink';
import Error404 from '../error404/Error404';
import { servicePage } from '../../pageMetadata';
import { CONTACT_PATH } from '../../routes';
import './ServicePage.css';

const ServiceContent = ({ service }) => {
  const { phase, hasEntered } = usePageTransition();
  const showService = hasEntered || phase === 'revealing';
  const metadata = servicePage(service);
  usePageMetadata(metadata.title, metadata.description);

  return (
    <main className="service-page" aria-busy={!showService}>
      <section
        className={`service-hero${showService ? ' service-hero--revealed' : ''}`}
        aria-labelledby="service-title"
      >
        <img
          className="service-hero__image"
          {...getResponsiveImageProps(service.image, '100vw')}
          alt=""
          fetchPriority="high"
        />
        <div className="service-hero__shade" />
        <div className="container service-hero__content">
          <p className="service-page__eyebrow">Áreas de práctica</p>
          <h1 className="service-hero__title" id="service-title">
            {service.title}
          </h1>
        </div>
      </section>

      <section className={`service-description${showService ? ' service-description--revealed' : ''}`}>
        <div className="container service-description__layout">
          <p className="service-description__eyebrow">Servicio legal</p>
          <div>
            <p className="service-description__text">{service.description}</p>
            <p className="service-description__intro">{service.intro}</p>
          </div>
        </div>
      </section>

      <section className="service-details" aria-label={`Detalles sobre ${service.title}`}>
        <div className="container service-details__grid">
          <div className="service-details__block">
            <h2>¿En qué casos te podemos ayudar?</h2>
            <ul>
              {service.cases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="service-details__block">
            <h2>Documentación útil para la consulta</h2>
            <ul>
              {service.documents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="service-details__note">
              Si no tenés toda la documentación, igual podés consultarnos: te indicamos qué hace falta.
            </p>
          </div>
        </div>
      </section>

      <section className="service-faq" aria-labelledby="service-faq-title">
        <div className="container service-faq__layout">
          <h2 id="service-faq-title">Preguntas frecuentes</h2>
          <div className="service-faq__list">
            {service.faq.map(({ question, answer }) => (
              <details key={question} className="service-faq__item">
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta" aria-labelledby="service-cta-title">
        <div className="container service-cta__layout">
          <div>
            <h2 id="service-cta-title">¿Querés consultar sobre {service.title.toLowerCase()}?</h2>
            <p>Escribinos y te respondemos para coordinar una consulta.</p>
          </div>
          <div className="service-cta__actions">
            <a
              className="service-cta__button service-cta__button--primary"
              href={whatsappUrl(`Hola, quisiera hacer una consulta sobre ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <TransitionLink
              className="service-cta__button service-cta__button--secondary"
              to={`${CONTACT_PATH}?area=${service.slug}`}
            >
              Usar el formulario
            </TransitionLink>
          </div>
        </div>
      </section>
    </main>
  );
};

const ServicePage = () => {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  return service ? <ServiceContent service={service} /> : <Error404 />;
};

export default ServicePage;
