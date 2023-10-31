import './Home.css'
import { NavLink } from 'react-router-dom'
import Carrusel from '../../components/Carrusel/Carrusel.js'
// import Image from '../../images/image.js'
// import React, { useState } from 'react'
import Data from '../../json/Data.json'
import Card  from '../../components/Card/Card.js'

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
        <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'  >  
          <NavLink className='titulos' exact to={'/error'}>  
            <div class='card1 justify-content-center col-12 '>          
              {/* <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
                <div class='img-container'>
                  <img 
                    src={Image.card1} 
                    className='imgss' 
                    alt='...' 
                    oonMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    style={{
                      transform: `scale(${zoom ? 1.5 : 1}) translate(${transform.x}px, ${transform.y}px)`,
                      transition: 'transform 0.3s',
                    }}
                  />
                </div>
              </div>             */}
              
              {
                Data.map((Data)=>(              
                <Card description={Data.description} title={Data.title}/>
              ))}
              
              
            </div>
          </NavLink>        
        </div>  
      </>
    )
  }
  


export default Home