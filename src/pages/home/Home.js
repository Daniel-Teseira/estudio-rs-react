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
      
      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">          
          <div class="cardss col-6">
            <div class="img-container" >
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
          
          <div className="d-flex flex-column col-6 align-items-center justify-content-center">            
              <h4 className='d-flex text-white card-title '>Familia</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">          
          <div class="cardss col-6">
            <div class="img-container" >
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
          
          <div className="d-flex flex-column col-6 align-items-center justify-content-center">            
              <h4 className='d-flex text-white card-title '>Laboral</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">          
          <div class="cardss col-6">
            <div class="img-container" >
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
          
          <div className="d-flex flex-column col-6 align-items-center justify-content-center">            
              <h4 className='d-flex text-white card-title '>Previsional</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">          
          <div class="cardss col-6">
            <div class="img-container" >
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
          
          <div className="d-flex flex-column col-6 align-items-center justify-content-center">            
              <h4 className='d-flex text-white card-title '>Prescripción Adquisitiva</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>
        
      </div>

      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">          
          <div class="cardss col-6">
            <div class="img-container" >
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
          
          <div className="d-flex flex-column col-6 align-items-center justify-content-center">            
              <h4 className='d-flex text-white card-title '>Acuerdos extrajudiciales</h4>
              {/* <p className='d-flex text-white '>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>  */}
              <p className='d-flex text-white'>El derecho de familia es una rama del derecho que se ocupa de regular las relaciones familiares y los aspectos legales que las rodean. Incluye asuntos como matrimonio, divorcio, custodia de hijos, adopción, patria potestad y sucesiones. El objetivo principal del derecho de familia es proteger los derechos y deberes de los miembros de la familia, promoviendo el bienestar de los niños y buscando soluciones equitativas para los conflictos familiares. Este campo legal abarca la creación y disolución de matrimonios, la determinación de la filiación, la distribución de bienes y la protección de los derechos de los cónyuges y los hijos.</p>
          </div>
        </div>
        </NavLink>
        
      </div>


    <section className='cuerpo'>
      
      <section className='d-flex flex-row flex-wrap justify-content-center col-lg-12 cards py-5'>

        {/* <div className='card col-lg-3 mx-4 my-3'>
          <img src={Image.card1} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Familia</h5>
            </NavLink>
            <p className='card-text'>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>             
          </div>
        </div> */}

        {/* <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card2} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Laboral</h5>
            </NavLink>
            <p className='card-text'>accidente de trabajo, despidos</p>             
          </div>        
        </div> */}

        {/* <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card3} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Previsional </h5>
            </NavLink>
            <p className='card-text'>jubilacion, pensión</p>             
          </div>
        </div> */}
{/* 
        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card4} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Daños y Perjuicios</h5>
            </NavLink>
            <p className='card-text'>accidentes , otros ..</p>             
          </div>
        </div>

        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card5} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Prescripción Adquisitiva</h5>
            </NavLink>
            <p className='card-text'>corta , larga ...</p>             
          </div>
        </div>

        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card6} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Consumidor </h5>
            </NavLink>
            <p className='card-text'></p>             
          </div>
        </div>

        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card7} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Acuerdos extrajudiciales</h5>
            </NavLink>
            <p className='card-text'></p>             
          </div>
        </div> */}

        {/* <div className='card col-lg-3 mx-4 my-3' style='width: 18rem;'>
          <img src='./images/body/pexels-ekaterina-bolovtsova-6077447.jpg' className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title'>Card title</h5>
            </NavLink>
            <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>             
          </div>
        </div> */}
      </section>
    </section>
    </>
  )
}

export default Home