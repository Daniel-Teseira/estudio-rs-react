import './navbar.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import services from '../../data/services.json';
import studio from '../../data/studio.json';
import TransitionLink from '../TransitionLink/TransitionLink';
import { usePageTransition } from '../../context/PageTransitionContext';
import { CONTACT_PATH, HOME_PATH, servicePath } from '../../routes';

const MENU_ID = 'responsive-navbar-nav';
const SERVICES_MENU_ID = 'services-menu';

const NavBar = () => {
  const { pathname } = useLocation();
  const { animatedPath } = usePageTransition();
  const isTransitionDestination = animatedPath === pathname;
  // El componente se vuelve a montar en cada ruta (key), así que ambos menús arrancan cerrados.
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  const currentProps = (path) => (pathname === path ? { 'aria-current': 'page' } : {});
  const activeClass = (isActive) => (isActive ? ' active' : '');
  const menuItems = () => [...(dropdownRef.current?.querySelectorAll('.dropdown-item') ?? [])];

  useEffect(() => {
    if (!servicesOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setServicesOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [servicesOpen]);

  const handleDropdownKeyDown = (event) => {
    const items = menuItems();
    const index = items.indexOf(document.activeElement);
    if (event.key === 'Escape' && servicesOpen) {
      event.stopPropagation();
      setServicesOpen(false);
      toggleRef.current?.focus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!servicesOpen) setServicesOpen(true);
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = index === -1 ? (step === 1 ? 0 : items.length - 1) : (index + step + items.length) % items.length;
      // Espera al render que muestra el menú antes de mover el foco.
      requestAnimationFrame(() => menuItems()[next]?.focus());
    }
  };

  const handleDropdownBlur = (event) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) setServicesOpen(false);
  };

  const handleNavKeyDown = (event) => {
    if (event.key === 'Escape' && menuOpen) setMenuOpen(false);
  };

  // Los manejadores de teclado en <nav> y en el <li> del menú solo delegan eventos
  // (Escape y flechas) que nacen en los botones y enlaces que contienen.
  return (
    // eslint-disable-next-line jsx-a11y-x/no-noninteractive-element-interactions
    <nav
      key={pathname}
      aria-label="Navegación principal"
      onKeyDown={handleNavKeyDown}
      className={`navbar navbar-expand-lg bg-body-tertiary${isTransitionDestination ? ' navbar--route-transition' : ''}`}
    >
      <div className="container">
        <TransitionLink className="navbar-brand" to={HOME_PATH}>
          <img src="/icons/logo.svg" alt="" width="28" height="28" className="d-inline-block align-text-top" />{' '}
          {studio.name}
        </TransitionLink>

        <button
          className={`navbar-toggler${menuOpen ? '' : ' collapsed'}`}
          type="button"
          aria-controls={MENU_ID}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Un clic en cualquier enlace cierra los menús, incluso si lleva a la página actual. */}
        {/* eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions */}
        <div
          className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`}
          id={MENU_ID}
          onClick={(event) => {
            if (event.target.closest('a')) {
              setMenuOpen(false);
              setServicesOpen(false);
            }
          }}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <TransitionLink
                className={`nav-link${activeClass(pathname === HOME_PATH)}`}
                to={HOME_PATH}
                {...currentProps(HOME_PATH)}
              >
                Inicio
              </TransitionLink>
            </li>
            <li className="nav-item">
              <TransitionLink
                className={`nav-link${activeClass(pathname === CONTACT_PATH)}`}
                to={CONTACT_PATH}
                {...currentProps(CONTACT_PATH)}
              >
                Contacto
              </TransitionLink>
            </li>
            {/* eslint-disable-next-line jsx-a11y-x/no-noninteractive-element-interactions */}
            <li
              ref={dropdownRef}
              className={`nav-item dropdown${servicesOpen ? ' show' : ''}`}
              onKeyDown={handleDropdownKeyDown}
              onBlur={handleDropdownBlur}
            >
              <button
                ref={toggleRef}
                className={`nav-link dropdown-toggle${activeClass(pathname.startsWith('/servicios/'))}`}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={SERVICES_MENU_ID}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Servicios
              </button>
              <ul
                id={SERVICES_MENU_ID}
                className={`dropdown-menu dropdown-menu-end${servicesOpen ? ' show' : ''}`}
                data-bs-popper="static"
              >
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
