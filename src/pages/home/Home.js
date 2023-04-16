import Image from '../../images/image.js'
import './Home.css'

const Home=({name})=>{

 
    return(
        
        <section className='cuerpo'>

        <section className='d-flex flex-row flex-wrap  col-lg-12 carrusel w-100 align-items-center'>
          <div id='carouselExampleInterval' className='carousel slide' data-bs-ride='carousel'>
            <div className='carousel-inner'>
              <div className='carousel-item active' data-bs-interval='7500'>
                <img src={Image.carrusel1} className='d-block w-100' alt='...'/>
              </div>

              <div className='carousel-item'>
                <img src={Image.carrusel2} className='d-block w-100' alt='...'/>
              </div>

              <div className='carousel-item'>
                <img src={Image.carrusel3} className='d-block w-100' alt='...'/>
              </div>

            </div>

            <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleInterval' data-bs-slide='prev'>
              <span className='carousel-control-prev-icon' aria-hidden='true'></span>
              <span className='visually-hidden'>Anterior</span>
            </button>
            <button className='carousel-control-next' type='button' data-bs-target='#carouselExampleInterval' data-bs-slide='next'>
              <span className='carousel-control-next-icon' aria-hidden='true'></span>
              <span className='visually-hidden'>Siguiente</span>
            </button>
          </div>
        </section>

        <section className='d-flex flex-row flex-wrap justify-content-center col-lg-12 cards py-5'>
  
          <div className='card card-s col-lg-3 col-md-2 mx-4 my-3 '>
            <img src={Image.card1} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Familia</h5>
              </a>
              <p className='card-text'>Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>             
            </div>
          </div>

          <div className='card card-s  col-lg-3 col-md-2 mx-4 my-3' >
            <img src={Image.card2} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Laboral</h5>
              </a>
              <p className='card-text'>accidente de trabajo, despidos</p>             
            </div>        
          </div>

          <div className='card card-s col-lg-3 col-md-2 mx-4 my-3' >
            <img src={Image.card3} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Previsional </h5>
              </a>
              <p className='card-text'>jubilacion, pensión</p>             
            </div>
          </div>

          <div className='card card-s col-lg-3 mx-4 my-3' >
            <img src={Image.card4} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Daños y Perjuicios</h5>
              </a>
              <p className='card-text'>accidentes , otros ..</p>             
            </div>
          </div>

          <div className='card card-s col-lg-3 mx-4 my-3' >
            <img src={Image.card5} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Prescripción Adquisitiva</h5>
              </a>
              <p className='card-text'>corta , larga ...</p>             
            </div>
          </div>

          <div className='card card-s col-lg-3 mx-4 my-3' >
            <img src={Image.card6} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Consumidor </h5>
              </a>
              <p className='card-text'></p>             
            </div>
          </div>
 
          <div className='card card-s col-lg-3 mx-4 my-3'>
            <img src={Image.card7} className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title d-flex col-12 justify-content-center'>Acuerdos extrajudiciales</h5>
              </a>
              <p className='card-text'></p>             
            </div>
          </div>

          {/* <div className='card col-lg-3 mx-4 my-3' style='width: 18rem;'>
            <img src='./images/body/pexels-ekaterina-bolovtsova-6077447.jpg' className='card-img-top' alt='...' width='60' height='250'/>
            <div className='card-body'>
              <a className='titulos' href='./pages/error404.html'>
                <h5 className='card-title'>Card title</h5>
              </a>
              <p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>             
            </div>
          </div> */}
        </section>

      </section>
    )
}

export default Home