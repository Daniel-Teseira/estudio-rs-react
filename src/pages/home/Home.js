

const Home=({name})=>{

 
    return(
        
        <section class="cuerpo">

        <section class="d-flex flex-row flex-wrap  col-lg-12 carrusel w-100 align-items-center">
          <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="7500">
                <img src="../images/body/pexels-ekaterina-bolovtsova-6077447.jpg" class="d-block w-100" alt="..."/>
              </div>

              <div class="carousel-item">
                <img src="./images/body/pexels-pixabay-159832.jpg" class="d-block w-100" alt="..."/>
              </div>

              <div class="carousel-item">
                <img src="./images/body/pexels-amine-m'siouri-2246258.jpg" class="d-block w-100" alt="..."/>
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
            <img src='../../components/images/body/familia/pexels-victoria-akvarel-1648387 (1).jpg' class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Familia</h5>
              </a>
              <p class="card-text">Divorcio, alimentos, régimen de visitas, guarda legal, filiación</p>             
            </div>
          </div>

          <div class="card card-s  col-lg-3 col-md-2 mx-4 my-3" >
            <img src="./images/body/laboral/__C__mo-opera-el-derecho-laboral-en-M__xico_.jpg" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Laboral</h5>
              </a>
              <p class="card-text">accidente de trabajo, despidos</p>             
            </div>        
          </div>

          <div class="card card-s col-lg-3 col-md-2 mx-4 my-3" >
            <img src="./images/body/previcional/pexels-kampus-production-8829201 (3).jpg" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Previsional </h5>
              </a>
              <p class="card-text">jubilacion, pensión</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src="./images/body/dañosYperjuicios/factor-humano-causa-accidentes-transito.jpg" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Daños y Perjuicios</h5>
              </a>
              <p class="card-text">accidentes , otros ..</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src="./images/body/prescipcionAdquisitiva/prescripcion-adquisitiva-de-dominio.jpg" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Prescripción Adquisitiva</h5>
              </a>
              <p class="card-text">corta , larga ...</p>             
            </div>
          </div>

          <div class="card card-s col-lg-3 mx-4 my-3" >
            <img src="./images/body/consumidor/indice-nacional-de-precios-al.webp" class="card-img-top" alt="..." width="60" height="250"/>
            <div class="card-body">
              <a class="titulos" href="./pages/error404.html">
                <h5 class="card-title d-flex col-12 justify-content-center">Consumidor </h5>
              </a>
              <p class="card-text"></p>             
            </div>
          </div>
 
          <div class="card card-s col-lg-3 mx-4 my-3">
            <img src="./images/body/acuerdosExtrajudiciales/pexels-pixabay-48148.jpg" class="card-img-top" alt="..." width="60" height="250"/>
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