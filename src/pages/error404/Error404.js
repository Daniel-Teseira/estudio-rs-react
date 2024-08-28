import './Error404.css'
import { NavLink } from 'react-router-dom'

const Error404=()=>{ 
  return(       
  <>
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-12 col-sm-offset-1 text-center">
              <div class="four_zero_four_bg col-12">
                <h1 class="text-center ">
                  ERROR 404
                </h1>
              </div>
              <div class="contant_box_404">
                <h3 class="h2">
                  Parece que estás perdido
                </h3>
                <p>
                  ¡La página que estás buscando no está disponible!
                </p>
                <NavLink exact to={'/home'}>
                  <span class="link_404">
                    Volver al MENU
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      <div id="app"></div>
      <a href="https://dribbble.com/shots/3774469-T-R-A-V-E-L-E-R" target="_blank" class="icon-link">
        <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png"/>
        </a>
      <a href="https://twitter.com/NikolayTalanov" target="_blank" class="icon-link icon-link--twitter">
        <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png"/>
        </a>
    </div>
  </>
  )
}

export default Error404