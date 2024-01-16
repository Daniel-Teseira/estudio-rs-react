import './Home.css'
import { NavLink } from 'react-router-dom'
import Carrusel from '../../components/Carrusel/Carrusel.js'
import Data from '../../json/Data.json'
import Card  from '../../components/Card/Card.js'
import React from 'react';

const Home=()=>{   
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

    return(        
      <>
      <Carrusel/>
        <div className='container p-0 my-5'>  
          <NavLink className='titulos' exact to={'/error'}>            
            {
              Data.length===0
              ? <h3 className='mt-5 text-white'> Cargando...</h3>
              : Data.servicio.map((aux) => (              
                  <Card 
                    description={aux.description} 
                    title={aux.title}  
                    image={aux.picture}                    
                    {...aux}
                  />                              
                  ))
                   
            }                  
          </NavLink>        
        </div>  
      </>
    )
  }
  


export default Home