import './navbar.css'
import Image from '../../images/image.js'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbaar = () =>{
  return(    
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">
          <img src={Image.nav1} alt='Logo' width='30' height='24' className='d-inline-block align-text-top'/>
          Estudio Juridico RS
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Nosotros</Nav.Link>
            <Nav.Link href="/home">Contacto</Nav.Link>

            <NavDropdown title="Servicios" id="collasible-nav-dropdown">
              <section className='d-flex flex-column flex-lg-row flex-xl-row flex-xxl-row align-items-center'>
                  <section className='flex-column'>
                    <img src={Image.nav2} alt='imagen'/>
                  </section>

                  <section className='flex-column'>
                    <NavDropdown.displayName href="#action/3.1">Familia</NavDropdown.displayName>
                    <NavDropdown.ItemText href="#action/3.1">Divorcio</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Alimentos</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Régimen De Visitas</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Guarda Legal</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Filiación</NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.displayName href="#action/3.1">Acuerdos Extrajudiciales</NavDropdown.displayName>
                  </section>

                  <section className='flex-column'>
                    <NavDropdown.displayName href="#action/3.1">Laboral</NavDropdown.displayName>
                    <NavDropdown.ItemText href="#action/3.1">Accidente De Trabajo</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Despidos</NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.displayName href="#action/3.1">Previsional</NavDropdown.displayName>
                    <NavDropdown.ItemText href="#action/3.1">Jubilación</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Pensión</NavDropdown.ItemText>
                  </section>

                  <section className='flex-column'>
                    <NavDropdown.displayName href="#action/3.1">Daños Y Perjuicios</NavDropdown.displayName>
                    <NavDropdown.ItemText href="#action/3.1">Accidentes</NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.displayName href="#action/3.1">Prescripción Adquisitiva</NavDropdown.displayName>
                    <NavDropdown.ItemText href="#action/3.1">Breve</NavDropdown.ItemText>
                    <NavDropdown.ItemText href="#action/3.1">Larga</NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.displayName href="#action/3.1">Consumidor</NavDropdown.displayName>
                  </section>                
              </section>
            </NavDropdown>
          </Nav>
          {/* <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>    
    </>
  )
}
export default Navbaar