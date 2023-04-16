// import { useState } from 'react'
// import { NavLink, useLocation } from 'react-router-dom'
import './navbar.css'
import Image from '../../images/image.js'

const Navbar = ({name,img}) =>{
// const {pathname}= useLocation()
  return(    
    <nav className='navbar navbar-expand-lg bg-body-tertiary naavbaar col-12'>
    <div className='container-fluid'>
      <a className='navbar-brand' href='./index.html'>              
        <img src={Image.nav1} alt='Logo' width='30' height='24' className='d-inline-block align-text-top'/>
        Estudio Juridico RS
      </a>

      <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      
      <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
        <ul className='navbar-nav mb-2 mb-lg-0 align-content-center'>             
         
          <li className='nav-item'>
            <a className='nav-link' href='./pages/error404.html'>Nosotros</a>
          </li>

          <li className='nav-item'>
            <a className='nav-link' href='./pages/error404.html'>Contacto</a>
          </li>

          <li className='nav-item dropdown'>
            <a className='nav-link dropdown-toggle' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
              Servicios
            </a>

            <ul className='dropdown-menu'>
              <section className='d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row align-items-center'>
                <section className='flex-column'>
                  <img src={Image.nav2} alt='imagen'/>
                </section>

                <section className='flex-column'>
                  <li>
                    <a className='dropdown-item' href='./pages/error404.html'>
                      Familia
                    </a>

                    <ul>                        
                      <li className='dropdown-item'>
                        Divorcio
                      </li>
                      <li className='dropdown-item'>
                        Alimentos
                      </li>
                      <li className='dropdown-item'>
                        Régimen De Visitas
                      </li>
                      <li className='dropdown-item'>
                        Guarda Legal
                      </li>
                      <li className='dropdown-item'>
                        Filiación
                      </li>
                    </ul>
                  </li>                      

                  <li><hr className='dropdown-divider'/></li>

                  <a className='dropdown-item' href='./pages/error404.html'>Acuerdos Extrajudiciales</a>
                  
                </section>

                <section className='flex-column'>

                  <li>
                    <a className='dropdown-item' href='./pages/error404.html'>
                      Laboral
                    </a>

                    <ul>                        
                      <li className='dropdown-item'>
                        Accidente De Trabajo
                      </li>

                      <li className='dropdown-item'>
                        Despidos
                      </li>
                    </ul>
                  </li>

                  <li><hr className='dropdown-divider'/></li>

                  <li>
                    <a className='dropdown-item' href='./pages/error404.html'>
                      Previsional
                    </a>

                    <ul>                        
                      <li className='dropdown-item'>
                        Jubilación
                      </li>
                      
                      <li className='dropdown-item'>
                        Pensión
                      </li>
                    </ul>
                  </li>                      

                </section>

                <section className='flex-column'>

                  <li>
                    <a className='dropdown-item' href='./pages/error404.html'>
                      Daños Y Perjuicios
                    </a>

                    <ul>                        
                      <li className='dropdown-item'>
                        Accidentes 
                      </li>                          
                    </ul>
                  </li>

                  <li>
                    <a className='dropdown-item' href='./pages/error404.html'>
                      Prescripción Adquisitiva
                    </a>

                    <ul>                        
                      <li className='dropdown-item'>
                        Breve 
                      </li>
                      <li className='dropdown-item'>
                        Larga 
                      </li>                          
                    </ul>
                  </li>

                  <li><hr className='dropdown-divider'/></li>

                  <li><a className='dropdown-item' href='./pages/error404.html'>Consumidor</a></li>  
                 
                </section>             
                
              </section>
            </ul>
          </li>

        </ul>
                 
        {/* <div className='form-check form-switch mode-switch pe-lg-1 ms-auto me-4 d-flex align-items-center' data-bs-toggle='mode'>
          <input type='checkbox' className='form-check-input' id='theme-mode'>
          <label className='form-check-label d-none d-sm-block' for='theme-mode'>Light</label>
          <label className='form-check-label d-none d-sm-block' for='theme-mode'>Dark</label>
        </div>

        <form className='d-flex' role='search'>
          <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search'>
          <button className='btn btn-outline-success' type='submit'>Search</button>
        </form> */}

      </div>
    </div>
  </nav> 
  )
}
export default Navbar