import './navbar.css';
import Image from '../../images/image.js';
import { useLocation } from 'react-router-dom';
import Data from '../../json/Data.json';
import serviceSlug from '../../utils/serviceSlug';
import TransitionLink from '../TransitionLink/TransitionLink';
import { usePageTransition } from '../../context/PageTransitionContext';

const NavBar = () => {
  const { pathname } = useLocation();
  const { animatedPath } = usePageTransition();
  const isTransitionDestination = animatedPath === pathname;

  return (
    <nav
      key={pathname}
      aria-label="Navegación principal"
      className={`navbar navbar-expand-lg bg-body-tertiary${isTransitionDestination ? ' navbar--route-transition' : ''}`}
    >
      <div className="container">
        <TransitionLink className="navbar-brand" to="/home">
          <img
            src={Image.nav1}
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />{' '}
          Estudio Jurídico RS
        </TransitionLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#responsive-navbar-nav"
          aria-controls="responsive-navbar-nav"
          aria-expanded="false"
          aria-label="Abrir navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="responsive-navbar-nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <TransitionLink
                className={`nav-link${(pathname === '/' || pathname === '/home') ? ' active' : ''}`}
                to="/home"
                aria-current={(pathname === '/' || pathname === '/home') ? 'page' : undefined}
              >
                Inicio
              </TransitionLink>
            </li>
            <li className="nav-item">
              <TransitionLink
                className={`nav-link${pathname === '/contact' ? ' active' : ''}`}
                to="/contact"
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                Contacto
              </TransitionLink>
            </li>
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle${pathname.startsWith('/servicios/') ? ' active' : ''}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Servicios
              </button>
              <ul className="dropdown-menu">
                {Data.map((service) => (
                  <li key={service.id}>
                    <TransitionLink
                      className={`dropdown-item${pathname === `/servicios/${serviceSlug(service.title)}` ? ' active' : ''}`}
                      to={`/servicios/${serviceSlug(service.title)}`}
                      aria-current={pathname === `/servicios/${serviceSlug(service.title)}` ? 'page' : undefined}
                    >
                      {service.title}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
