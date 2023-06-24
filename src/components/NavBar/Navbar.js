import { NavLink } from 'react-router-dom'
import './navbar.css'
import Image from '../../images/image.js'

const Navbar = () =>{
  return(    
    <nav className='navbar navbar-expand-lg bg-body-tertiary naavbaar col-12'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' exact to={'/home'}>              
          <img src={Image.nav1} alt='Logo' width='30' height='24' className='d-inline-block align-text-top'/>
          Estudio Juridico RS
        </NavLink>

        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        
        <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul className='navbar-nav mb-2 mb-lg-0 align-content-center'>             
          
            <li className='nav-item'>
              <NavLink className='nav-link' exact to={'/error'}>Nosotros</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link'exact to={'/error'}>Contacto</NavLink>
            </li>

            <li className='nav-item dropdown'>
              <NavLink className='nav-link dropdown-toggle' exact to={'/error'} role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                Servicios
              </NavLink>

              <ul className='dropdown-menu'>
                <section className='d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row align-items-center'>
                  <section className='flex-column'>
                    <img src={Image.nav2} alt='imagen'/>
                  </section>

                  <section className='flex-column'>
                    <li>
                      <NavLink className='dropdown-item' exact to={'/error'}>
                        Familia
                      </NavLink>

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

                    <NavLink className='dropdown-item' exact to={'/error'}>Acuerdos Extrajudiciales</NavLink>
                    
                  </section>

                  <section className='flex-column'>

                    <li>
                      <NavLink className='dropdown-item' exact to={'/error'}>
                        Laboral
                      </NavLink>

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
                      <NavLink className='dropdown-item' exact to={'/error'}>
                        Previsional
                      </NavLink>

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
                      <NavLink className='dropdown-item' exact to={'/error'}>
                        Daños Y Perjuicios
                      </NavLink>

                      <ul>                        
                        <li className='dropdown-item'>
                          Accidentes 
                        </li>                          
                      </ul>
                    </li>

                    <li>
                      <NavLink className='dropdown-item' exact to={'/error'}>
                        Prescripción Adquisitiva
                      </NavLink>

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

                    <li><NavLink className='dropdown-item' exact to={'/error'}>Consumidor</NavLink></li>  
                  
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