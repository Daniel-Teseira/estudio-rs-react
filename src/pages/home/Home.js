import './Home.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import Data from '../../json/Data.json';
import Card from '../../components/Card/Card';
import TransitionLink from '../../components/TransitionLink/TransitionLink';
import serviceSlug from '../../utils/serviceSlug';
import { usePageTransition } from '../../context/PageTransitionContext';

const Home = () => {
  const { phase, hasEntered } = usePageTransition();
  const carouselState = phase === 'revealing'
    ? 'home-carousel--revealing'
    : hasEntered
      ? 'home-carousel--ready'
      : 'home-carousel--waiting';
  // Comentado: Si planeas usar el zoom y el movimiento del ratón, asegúrate de que el estado y los manejadores estén correctamente configurados
  // const [transform, setTransform] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(false);

  // const handleMouseEnter = () => {
  //   setZoom(true);
  // };

  // const handleMouseLeave = () => {
  //   setZoom(false);
  //   setTransform({ x: 0, y: 0 });
  // };

  // const handleMouseMove = (event) => {
  //   if (!zoom) {
  //     const mousex = event.pageX + event.currentTarget.offsetLeft;
  //     const mousey = event.pageY + event.currentTarget.offsetTop;
  //     const imgx = (mousex + event.currentTarget.offsetWidth / 500) / 40;
  //     const imgy = (mousey + event.currentTarget.offsetHeight / 500) / 40;
  //     setTransform({ x: imgx, y: imgy });
  //   }
  // };

  return (
    <>
      <div className={`home-carousel ${carouselState}`}>
        <Carrusel/>
      </div>
      <div className='container p-0 my-5'>
        {
          Data.length === 0
          ? <h3 className='mt-5 text-white'> Cargando...</h3>
          : Data.map((aux) => (
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
          ))
        }
      </div>
    </>
  );
};

export default Home;
