import './navbar.css';
import Image from '../../images/image.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  return (
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
                  <NavDropdown.Header>Familia</NavDropdown.Header>
                  <NavDropdown.Item href="#action/3.1">Divorcio</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Alimentos</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Régimen De Visitas</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Guarda Legal</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Filiación</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Header>Acuerdos Extrajudiciales</NavDropdown.Header>
                </section>

                <section className='flex-column'>
                  <NavDropdown.Header>Laboral</NavDropdown.Header>
                  <NavDropdown.Item href="#action/3.1">Accidente De Trabajo</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Despidos</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Header>Previsional</NavDropdown.Header>
                  <NavDropdown.Item href="#action/3.1">Jubilación</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Pensión</NavDropdown.Item>
                </section>

                <section className='flex-column'>
                  <NavDropdown.Header>Daños Y Perjuicios</NavDropdown.Header>
                  <NavDropdown.Item href="#action/3.1">Accidentes</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Header>Prescripción Adquisitiva</NavDropdown.Header>
                  <NavDropdown.Item href="#action/3.1">Breve</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Larga</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Header>Consumidor</NavDropdown.Header>
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
  );
};

export default NavBar;
