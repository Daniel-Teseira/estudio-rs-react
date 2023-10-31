
const Card = ({description,title}) => {
  return (
    console.log(description),
    <>
    <div class='card1 justify-content-center col-12 '>          
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
            }}
          />
        </div>
      </div>             */}
      
      <div className='d-flex flex-column align-items-center justify-content-center' >            
          <h4 className='d-flex text-white card-title'>
            { title }            
          </h4>              
          <p className='d-flex text-white'>
            { description}
          </p>
      </div>
    </div>
    </>
  )
}

export default Card
