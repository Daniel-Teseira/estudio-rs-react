import './Home.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import services from '../../data/services.json';
import processSteps from '../../data/process.json';
import studio from '../../data/studio.json';
import Card from '../../components/Card/Card';
import TransitionLink from '../../components/TransitionLink/TransitionLink';
import { usePageTransition } from '../../context/PageTransitionContext';
import usePageMetadata from '../../hooks/usePageMetadata';
import { HOME_PAGE } from '../../pageMetadata';
import { CONTACT_PATH, servicePath } from '../../routes';

const Home = () => {
  const { phase, hasEntered } = usePageTransition();
  usePageMetadata(HOME_PAGE.title, HOME_PAGE.description);
  const carouselState =
    phase === 'revealing' ? 'home-carousel--revealing' : hasEntered ? 'home-carousel--ready' : 'home-carousel--waiting';
  const credentials = [studio.lawyer, studio.registration && `Matrícula ${studio.registration}`].filter(Boolean);

  return (
    <main className="home-page">
      <div className={`home-carousel ${carouselState}`}>
        <Carrusel />
      </div>

      <section className="home-services container p-0 my-5" aria-labelledby="home-services-title">
        <h2 className="home-services__heading" id="home-services-title">
          Áreas de práctica
        </h2>
        {services.map((service) => (
          <Card
            key={service.id}
            description={service.description}
            title={service.title}
            image={service.image}
            id={service.id}
            to={servicePath(service)}
            reverse={service.id % 2 === 0}
          />
        ))}
      </section>

      <section className="home-process" aria-labelledby="home-process-title">
        <div className="container home-process__layout">
          <div>
            <p className="home-eyebrow">Cómo trabajamos</p>
            <h2 id="home-process-title">Claridad desde la primera consulta.</h2>
            <p className="home-process__lead">
              Todo lo que nos cuentes queda bajo secreto profesional. Te explicamos cada paso en un lenguaje simple.
            </p>
          </div>
          <ol className="home-process__steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="home-process__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {studio.about && (
        <section className="home-about" aria-labelledby="home-about-title">
          <div className="container home-about__layout">
            <div>
              <p className="home-eyebrow">Sobre el estudio</p>
              <h2 id="home-about-title">{studio.name}</h2>
              {credentials.length > 0 && <p className="home-about__credentials">{credentials.join(' · ')}</p>}
            </div>
            <p className="home-about__text">{studio.about}</p>
          </div>
        </section>
      )}

      <section className="home-cta" aria-labelledby="home-cta-title">
        <div className="container home-cta__layout">
          <h2 id="home-cta-title">¿Tenés una consulta?</h2>
          <TransitionLink className="home-cta__button" to={CONTACT_PATH}>
            Contactar al estudio <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>
      </section>
    </main>
  );
};

export default Home;
