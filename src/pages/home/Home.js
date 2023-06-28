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
                <p className='d-flex text-white'>
                  El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.
                </p>
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
                <p className='d-flex text-white'>
                  El derecho laboral, también conocido como derecho del trabajo, es una rama del derecho que regula las relaciones entre empleadores y trabajadores. Se encarga de establecer las normas y garantías que protegen los derechos laborales, como el salario mínimo, las horas de trabajo, la seguridad y salud laboral, las vacaciones, la protección contra la discriminación y el despido injustificado. Además, el derecho laboral regula la negociación colectiva entre los sindicatos y los empleadores, así como el establecimiento de condiciones laborales justas y equitativas. Su objetivo es asegurar la protección y el bienestar de los trabajadores en el ámbito laboral.
                </p>
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
                <p className='d-flex text-white'>
                  El derecho previsional, también conocido como derecho de la seguridad social, es una rama del derecho que se ocupa de regular los sistemas de seguridad social y pensiones. Su objetivo principal es garantizar la protección económica y social de las personas en situaciones de vejez, discapacidad, desempleo y otros eventos de riesgo. El derecho previsional establece las normas y requisitos para acceder a prestaciones y beneficios, como pensiones de jubilación, pensiones por invalidez, subsidios por desempleo y asignaciones familiares. También regula la gestión y administración de los fondos de seguridad social, así como los derechos y obligaciones de los asegurados y beneficiarios.
                </p>
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
                <p className='d-flex text-white'>
                  La prescripción adquisitiva, también conocida como prescripción positiva o usucapión, es una figura legal que permite adquirir la propiedad de un bien inmueble o un derecho real sobre el mismo mediante la posesión continua, pacífica y pública durante un período de tiempo establecido por la ley. Esta institución tiene como objetivo principal brindar seguridad jurídica y estabilidad en las relaciones de propiedad. La prescripción adquisitiva requiere cumplir con ciertos requisitos, como la posesión en calidad de dueño, la buena fe y el transcurso del plazo establecido por la legislación correspondiente. Una vez cumplidos dichos requisitos, el poseedor adquiere el derecho de propiedad sobre el bien, incluso si el titular anterior no lo consiente.
                </p>
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
                <h4 className='d-flex text-white card-title '>Acuerdos Extrajudiciales</h4>                
                <p className='d-flex text-white'>                
                  Los acuerdos extrajudiciales en el ámbito del derecho son acuerdos o convenios alcanzados entre las partes involucradas en un conflicto o disputa legal, sin la necesidad de recurrir a un proceso judicial. Estos acuerdos buscan resolver el conflicto de manera amistosa y evitar los costos y retrasos asociados con un litigio judicial. Las partes pueden negociar y acordar términos, como el pago de una indemnización, la modificación de un contrato o la solución de cualquier disputa legal. Estos acuerdos suelen ser legalmente vinculantes y, una vez aceptados, pueden ser ejecutados y cumplidos por las partes involucradas sin la intervención de un tribunal.
                </p>
            </div>
          </div>
        </NavLink>        
      </div>
    </>
  )
}

export default Home