import React from 'react'
import Image from '../../images/image.js'
import './Carrusel.css'

export const Carrusel = () => {
  return (
    <section className='carrusel estilo'>
      <div id='carouselExampleInterval' className='carousel slide' data-bs-ride='carousel'>
        <div className='carousel-inner'>
          <div className='carousel-item active' data-bs-interval='7500'>
            <img src={Image.carrusel1} className='d-block w-100 imag' alt='...'/>                
          </div>

          <div className='carousel-item'>
            <img src={Image.carrusel2} className='d-block w-100 imag' alt='...'/>
          </div>

          <div className='carousel-item'>
            <img src={Image.carrusel3} className='d-block w-100 imag' alt='...'/>
          </div>
          
          <div className="carousel-caption d-none d-md-block">
            <h2 className='texto'>Bienvenido a nuestra página web jurídica, tu recurso confiable para todas tus necesidades legales. Somos un equipo de abogados expertos comprometidos a brindarte asesoramiento legal integral y soluciones efectivas para tus problemas legales. Ya sea que estés buscando información sobre diferentes áreas del derecho, necesites representación legal o desees comprender tus derechos y responsabilidades legales, estás en el lugar correcto.</h2>                
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

  )
}
export default Carrusel