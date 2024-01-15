import React from 'react'
import './Card.css'

// import React, { useState } from 'react'

const Card = ({description,title,picture,nombre}) => {
  return (
    <div className="card11 text-white" data-aos-duration='700' data-aos='fade-up' >
      

      {/* <img src={image} className="card-img-top" alt={ title } /> */}
       {/* <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
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
            }}/>
          </div>
        </div>
      */}

      <div className="card-body bg-black card22 py-5">
        <img 
          className="card-img-top" 
          src={require(`../../assets/images/${picture}`)}           
          alt={ nombre } 
        />
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">{ description }</p>
        {/* <a href="/" className="btn btn-primary">{ buttonLabel || 'Comprar' }</a> */}
      </div>

    </div>
    

    // <div class='card1 justify-content-center col-12 '>
    //   <div class='card1 justify-content-center col-12 '>          
        /* <div class='cardss col-lg-6 col-xl-6 col-xxl-6'>
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
        </div>             *
      
        <div className='d-flex flex-column align-items-center justify-content-center' >            
            <h4 className='d-flex text-white card-title'>
              { title }            
            </h4>              
            <p className='d-flex text-white'>
              { description}
            </p>
        </div>
      </div>
    </div>    */
  )
}

export default Card
