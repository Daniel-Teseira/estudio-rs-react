import './Home.css';
import Carrusel from '../../components/Carrusel/Carrusel';
import Data from '../../json/Data.json';
import Card from '../../components/Card/Card';

const Home = () => {
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
      <Carrusel/>
      <div className='container p-0 my-5'>
        {
          Data.length === 0
          ? <h3 className='mt-5 text-white'> Cargando...</h3>
          : Data.map((aux) => (
            <Card 
              key={aux.id}  // Asegúrate de que cada objeto en Data tenga un identificador único
              description={aux.description} 
              title={aux.title}  
              image={aux.image}
              {...aux}
            />
          ))
        }
      </div>
    </>
  );
};

export default Home;
