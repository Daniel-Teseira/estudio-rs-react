import './footer.css';
import TransitionLink from '../TransitionLink/TransitionLink';
import studio from '../../data/studio.json';
import whatsappUrl from '../../utils/whatsapp';
import { professionalDetails } from '../../utils/studioDetails';
import { CONTACT_PATH, HOME_PATH, PRIVACY_PATH } from '../../routes';

const socialIcons = {
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="site-footer__icon-fill" cx="17.7" cy="6.5" r="1" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.5-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.5v8" />
    </svg>
  ),
};

const Footer = () => {
  const details = professionalDetails();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <span className="site-footer__monogram" aria-hidden="true">
              RS
            </span>
            <div>
              <p className="site-footer__eyebrow">ESTUDIO JURÍDICO</p>
              <p className="site-footer__name">{studio.name}</p>
              {details.map(({ label, value }) => (
                <p key={label} className="site-footer__detail">
                  {label}: {value}
                </p>
              ))}
            </div>
          </div>

          <div className="site-footer__connect">
            <p className="site-footer__eyebrow">CONECTÁ CON NOSOTROS</p>
            <nav className="site-footer__socials" aria-label="Redes y contacto">
              {studio.social
                .filter(({ network }) => socialIcons[network])
                .map(({ network, url }) => (
                  <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={network}>
                    {socialIcons[network]}
                  </a>
                ))}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z" />
                  <path d="M8.4 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .7.4.7 1.1 1.4 1.8 1.8.3.2.5.2.7-.1l.8-.9c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.6-.5.5-1.2.7-1.8.7s-1.5-.2-2.6-.8c-1.3-.7-2.5-1.8-3.3-3-.6-.9-.9-1.8-.9-2.5 0-.6.3-1.3.7-1.8Z" />
                </svg>
              </a>
              <TransitionLink to={CONTACT_PATH} aria-label="Página de contacto">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </TransitionLink>
            </nav>
          </div>
        </div>

        <div className="site-footer__bottom">
          {/* El año del HTML prerenderizado puede diferir del navegador justo en Año Nuevo. */}
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {studio.name}. Todos los derechos reservados.
          </span>
          <div className="site-footer__links">
            <TransitionLink to={PRIVACY_PATH}>Privacidad</TransitionLink>
            <TransitionLink to={HOME_PATH}>
              Volver al inicio <span aria-hidden="true">↑</span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
