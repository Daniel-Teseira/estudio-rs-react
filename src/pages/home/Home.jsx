import './Home.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import services from '../../data/services.json';
import Card from '../../components/Card/Card';
import TransitionLink from '../../components/TransitionLink/TransitionLink';
import { usePageTransition } from '../../context/PageTransitionContext';
import usePageMetadata from '../../hooks/usePageMetadata';
import { HOME_PAGE } from '../../pageMetadata';
import { servicePath } from '../../routes';

const Home = () => {
  const { phase, hasEntered } = usePageTransition();
  usePageMetadata(HOME_PAGE.title, HOME_PAGE.description);
  const carouselState = phase === 'revealing'
    ? 'home-carousel--revealing'
    : hasEntered
      ? 'home-carousel--ready'
      : 'home-carousel--waiting';
  return (
    <main className="home-page">
      <div className={`home-carousel ${carouselState}`}>
        <Carrusel />
      </div>
      <section className="home-services container p-0 my-5" aria-labelledby="home-services-title">
        <h2 className="home-services__heading" id="home-services-title">Áreas de práctica</h2>
        {services.map((service) => (
          <TransitionLink className="home-service-link" key={service.id} to={servicePath(service)}>
            <Card
              description={service.description}
              title={service.title}
              image={service.image}
              id={service.id}
              reverse={service.id % 2 === 0}
            />
          </TransitionLink>
        ))}
      </section>
    </main>
  );
};

export default Home;
