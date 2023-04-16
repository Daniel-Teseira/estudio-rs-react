import Image from '../../images/image.js'
import './Home.css'

const Home=({name})=>{

 
    return(
        
        <section class="cuerpo">

        <section class="d-flex flex-row flex-wrap  col-lg-12 carrusel w-100 align-items-center">
          <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="7500">
                <img src={Image.carrusel1} class="d-block w-100" alt="..."/>
              </div>

              <div class="carousel-item">
                <img src={Image.carrusel2} class="d-block w-100" alt="..."/>
              </div>

              <div class="carousel-item">
                <img src={Image.carrusel3} class="d-block w-100" alt="..."/>
              </div>

            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Siguiente</span>
            </button>
          </div>
        </section>

        <section class="d-flex flex-row flex-wrap justify-content-center col-lg-12 cards py-5">
  
          <div class="card card-s col-lg-3 col-md-2 mx-4 my-3 ">
            <img src={Image.card1} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Familia</h5>
              </a>
              <p class="card-text">Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>             
            </div>
          </div>

          <div class="card card-s  col-lg-3 col-md-2 mx-4 my-3" >
            <img src={Image.card2} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Laboral</h5>
              </a>
              <p class="card-text">accidente de trabajo, despidos</p>             
            </div>        
          </div>

          <div class="card card-s col-lg-3 col-md-2 mx-4 my-3" >
            <img src={Image.card3} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Previsional </h5>
              </a>
              <p class="card-text">jubilacion, pensión</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src={Image.card4} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Daños y Perjuicios</h5>
              </a>
              <p class="card-text">accidentes , otros ..</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src={Image.card5} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Prescripción Adquisitiva</h5>
              </a>
              <p class="card-text">corta , larga ...</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src={Image.card6} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Consumidor </h5>
              </a>
              <p class="card-text"></p>             
            </div>
          </div>
 
          <div class="card card-s col-lg-3 mx-4 my-3">
            <img src={Image.card7} class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Acuerdos extrajudiciales</h5>
              </a>
              <p class="card-text"></p>             
            </div>
          </div>

          {/* <div class="card col-lg-3 mx-4 my-3" style="width: 18rem;">
            <img src="./images/body/pexels-ekaterina-bolovtsova-6077447.jpg" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title">Card title</h5>
              </a>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>             
            </div>
          </div> */}
        </section>

      </section>
    )
}

export default Home