import './navbar.css';
import { useLocation } from 'react-router-dom';
import services from '../../data/services.json';
import studio from '../../data/studio.json';
import TransitionLink from '../TransitionLink/TransitionLink';
import { usePageTransition } from '../../context/PageTransitionContext';
import { CONTACT_PATH, HOME_PATH, servicePath } from '../../routes';

const NavBar = () => {
  const { pathname } = useLocation();
  const { animatedPath } = usePageTransition();
  const isTransitionDestination = animatedPath === pathname;
  const currentProps = (path) => (pathname === path ? { 'aria-current': 'page' } : {});
  const activeClass = (isActive) => (isActive ? ' active' : '');

  return (
    <nav
      key={pathname}
      aria-label="Navegación principal"
      className={`navbar navbar-expand-lg bg-body-tertiary${isTransitionDestination ? ' navbar--route-transition' : ''}`}
    >
      <div className="container">
        <TransitionLink className="navbar-brand" to={HOME_PATH}>
          <img
            src="/icons/logo.svg"
            alt=""
            width="28"
            height="28"
            className="d-inline-block align-text-top"
          />{' '}
          {studio.name}
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
              <TransitionLink className={`nav-link${activeClass(pathname === HOME_PATH)}`} to={HOME_PATH} {...currentProps(HOME_PATH)}>
                Inicio
              </TransitionLink>
            </li>
            <li className="nav-item">
              <TransitionLink className={`nav-link${activeClass(pathname === CONTACT_PATH)}`} to={CONTACT_PATH} {...currentProps(CONTACT_PATH)}>
                Contacto
              </TransitionLink>
            </li>
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle${activeClass(pathname.startsWith('/servicios/'))}`}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Servicios
              </button>
              <ul className="dropdown-menu">
                {services.map((service) => (
                  <li key={service.id}>
                    <TransitionLink
                      className={`dropdown-item${activeClass(pathname === servicePath(service))}`}
                      to={servicePath(service)}
                      {...currentProps(servicePath(service))}
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
