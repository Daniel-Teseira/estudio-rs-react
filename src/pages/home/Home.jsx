import './Home.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import Data from '../../json/Data.json';
import Card from '../../components/Card/Card';
import TransitionLink from '../../components/TransitionLink/TransitionLink';
import serviceSlug from '../../utils/serviceSlug';
import { usePageTransition } from '../../context/PageTransitionContext';
import usePageMetadata from '../../hooks/usePageMetadata';

const Home = () => {
  const { phase, hasEntered } = usePageTransition();
  usePageMetadata(
    'Estudio Jurídico RS | Áreas de práctica',
    'Conocé las áreas de práctica de Estudio Jurídico RS y encontrá información para iniciar tu consulta.'
  );
  const carouselState = phase === 'revealing'
    ? 'home-carousel--revealing'
    : hasEntered
      ? 'home-carousel--ready'
      : 'home-carousel--waiting';
  return (
    <main className="home-page">
      <div className={`home-carousel ${carouselState}`}>
        <Carrusel/>
      </div>
      <section className='home-services container p-0 my-5' aria-labelledby='home-services-title'>
        <h2 className='home-services__heading' id='home-services-title'>Áreas de práctica</h2>
        {Data.map((aux) => (
            <TransitionLink
              className="home-service-link"
              key={aux.id}
              to={`/servicios/${serviceSlug(aux.title)}`}
            >
              <Card
                description={aux.description}
                title={aux.title}
                picture={aux.picture}
                id={aux.id}
                reverse={aux.id % 2 === 0}
              />
            </TransitionLink>
        ))}
      </section>
    </main>
  );
};

export default Home;
