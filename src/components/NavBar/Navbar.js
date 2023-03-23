// import { useState } from 'react'
// import { NavLink, useLocation } from 'react-router-dom'
import './navbar.css'

const Navbar = ({name}) =>{
// const {pathname}= useLocation()
  return(    
    <nav class="navbar navbar-expand-lg bg-body-tertiary naavbaar col-12">
    <div class="container-fluid">
      <a class="navbar-brand" href="./index.html">              
        <img src="./images/icons8-balance-scale-96.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>
        Estudio Juridico RS
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 align-content-center">             
         
          <li class="nav-item">
            <a class="nav-link" href="./pages/error404.html">Nosotros</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="./pages/error404.html">Contacto</a>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Servicios
            </a>

            <ul class="dropdown-menu">
              <section class="d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row align-items-center">
                <section class="flex-column">
                  <img src="./images/icons8-law-94.png" alt="imagen"/>
                </section>

                <section class="flex-column">
                  <li>
                    <a class="dropdown-item" href="./pages/error404.html">
                      Familia
                    </a>

                    <ul>                        
                      <li class="dropdown-item">
                        Divorcio
                      </li>
                      <li class="dropdown-item">
                        Alimentos
                      </li>
                      <li class="dropdown-item">
                        Régimen De Visitas
                      </li>
                      <li class="dropdown-item">
                        Guarda Legal
                      </li>
                      <li class="dropdown-item">
                        Filiación
                      </li>
                    </ul>
                  </li>                      

                  <li><hr class="dropdown-divider"/></li>

                  <a class="dropdown-item" href="./pages/error404.html">Acuerdos Extrajudiciales</a>
                  
                </section>

                <section class="flex-column">

                  <li>
                    <a class="dropdown-item" href="./pages/error404.html">
                      Laboral
                    </a>

                    <ul>                        
                      <li class="dropdown-item">
                        Accidente De Trabajo
                      </li>

                      <li class="dropdown-item">
                        Despidos
                      </li>
                    </ul>
                  </li>

                  <li><hr class="dropdown-divider"/></li>

                  <li>
                    <a class="dropdown-item" href="./pages/error404.html">
                      Previsional
                    </a>

                    <ul>                        
                      <li class="dropdown-item">
                        Jubilación
                      </li>
                      
                      <li class="dropdown-item">
                        Pensión
                      </li>
                    </ul>
                  </li>                      

                </section>

                <section class="flex-column">

                  <li>
                    <a class="dropdown-item" href="./pages/error404.html">
                      Daños Y Perjuicios
                    </a>

                    <ul>                        
                      <li class="dropdown-item">
                        Accidentes 
                      </li>                          
                    </ul>
                  </li>

                  <li>
                    <a class="dropdown-item" href="./pages/error404.html">
                      Prescripción Adquisitiva
                    </a>

                    <ul>                        
                      <li class="dropdown-item">
                        Breve 
                      </li>
                      <li class="dropdown-item">
                        Larga 
                      </li>                          
                    </ul>
                  </li>

                  <li><hr class="dropdown-divider"/></li>

                  <li><a class="dropdown-item" href="./pages/error404.html">Consumidor</a></li>  
                 
                </section>             
                
              </section>
            </ul>
          </li>

        </ul>
                 
        {/* <div class="form-check form-switch mode-switch pe-lg-1 ms-auto me-4 d-flex align-items-center" data-bs-toggle="mode">
          <input type="checkbox" class="form-check-input" id="theme-mode">
          <label class="form-check-label d-none d-sm-block" for="theme-mode">Light</label>
          <label class="form-check-label d-none d-sm-block" for="theme-mode">Dark</label>
        </div>

        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> */}

      </div>
    </div>
  </nav> 
  )
}
export default Navbar