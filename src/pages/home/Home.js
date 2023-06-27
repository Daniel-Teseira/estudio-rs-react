import { NavLink } from 'react-router-dom'
import Image from '../../images/image.js'
import './Home.css'
import React from 'react'
import Carrusel from '../../components/Carrusel/Carrusel.js'

const Home=()=>{ 
  
  function bigImg(event) {
    const mousex = event.pageX - (this).offset().left;
    const mousey = event.pageY - (this).offset().top;
    const imgx = (mousex - 300) / 40;
    const imgy = (mousey - 200) / 40;
    (this).css("transform", "translate(" + imgx + "px," + imgy + "px)");
  }
  
  function normalImg(event) {
    (this).height = "32px";
    (this).width = "32px";
  }
  return(        
    <>
    <Carrusel/>
    
      <div className="container card11 p-0 " >  
        <NavLink className='titulos' exact to={'/error'}>  
        <div class="d-flex flex-row justify-content-center my-1 col-12">
          <div class="col-6">
            <img src={Image.card1} className='' alt='...' mousemove={bigImg} mouseout={normalImg}/>
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
            <div class="img-container" mousemove={bigImg} mouseout={normalImg}>
              <img src={Image.card1} className='imgss' alt='...' />
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

    <section className='cuerpo'>
      
      <section className='d-flex flex-row flex-wrap justify-content-center col-lg-12 cards py-5'>

        <div className='card col-lg-3 mx-4 my-3'>
          <img src={Image.card1} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Familia</h5>
            </NavLink>
            <p className='card-text'>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>             
          </div>
        </div>

        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card2} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Laboral</h5>
            </NavLink>
            <p className='card-text'>accidente de trabajo, despidos</p>             
          </div>        
        </div>

        <div className='card card-s col-lg-3 mx-4 my-3'>
          <img src={Image.card3} className='card-img-top' alt='...' width='60' height='250'/>
          <div className='card-body'>
            <NavLink className='titulos' exact to={'/error'}>
              <h5 className='card-title d-flex col-12 justify-content-center'>Previsional </h5>
            </NavLink>
            <p className='card-text'>jubilacion, pensión</p>             
          </div>
        </div>

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
        </div>

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