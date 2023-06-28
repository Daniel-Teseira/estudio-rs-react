import { NavLink } from 'react-router-dom'
import Image from '../../images/image.js'
import './Home.css'
import React, { useState } from 'react'
import Carrusel from '../../components/Carrusel/Carrusel.js'


const Home=()=>{   
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(false);

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
    setTransform({ x: 0, y: 0 });
  };

  const handleMouseMove = (event) => {
    if (!zoom) {
      const mousex = event.pageX - event.currentTarget.offsetLeft;
      const mousey = event.pageY - event.currentTarget.offsetTop;
      const imgx = (mousex - event.currentTarget.offsetWidth / 500) / 40;
      const imgy = (mousey - event.currentTarget.offsetHeight / 500) / 40;
      setTransform({ x: imgx, y: imgy });
    }
  };

  return(        
    <>
    <Carrusel/>    
      
      <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'  >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class='card1 justify-content-center col-12 '>          
          <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
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
          </div>            
          
          <div className='d-flex flex-column align-items-center justify-content-center' >            
              <h4 className='d-flex text-white card-title'>Familia</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>        
      </div>

      <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'   >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class='card1 justify-content-center my-1 col-12'>          
          <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
            <div class='img-container' >
              <img 
                src={Image.card2}
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
          </div>            
          
          <div className='d-flex flex-column align-items-center justify-content-center'>            
              <h4 className='d-flex text-white card-title '>Laboral</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>        
      </div>

      <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'   >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class='card1 justify-content-center my-1 col-12'>          
          <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
            <div class='img-container' >
              <img 
                src={Image.card3} 
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
          </div>            
          
          <div className='d-flex flex-column align-items-center justify-content-center'>            
              <h4 className='d-flex text-white card-title '>Previsional</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>        
      </div>

      <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'   >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class='card1 justify-content-center my-1 col-12'>          
          <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
            <div class='img-container' >
              <img 
                src={Image.card5} 
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
          </div>            
          
          <div className='d-flex flex-column align-items-center justify-content-center'>            
              <h4 className='d-flex text-white card-title '>Prescripción Adquisitiva</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>        
      </div>

      <div className='container card11 p-0 my-5' data-aos-duration='700' data-aos='fade-up'   >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class='card1 justify-content-center my-1 col-12'>          
          <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
            <div class='img-container' >
              <img 
                src={Image.card7} 
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
          </div>            
          
          <div className='d-flex flex-column align-items-center justify-content-center'>            
              <h4 className='d-flex text-white card-title '>Acuerdos extrajudiciales</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>        
      </div>
    </>
  )
}

export default Home