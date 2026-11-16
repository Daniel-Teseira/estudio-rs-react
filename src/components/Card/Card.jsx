import './Card.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import getResponsiveImageProps from '../../utils/responsiveImage';
import TransitionLink from '../TransitionLink/TransitionLink';

const Card = ({ description, title, image, id, to, reverse = false }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`service-card${reverse ? ' service-card--reverse' : ''}${isVisible ? ' service-card--visible' : ''}`}
    >
      <div className="service-card__media">
        <img
          {...getResponsiveImageProps(image, '(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 42vw')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="service-card__number" aria-hidden="true">
          {String(id).padStart(2, '0')}
        </span>
        <span className="service-card__media-label" aria-hidden="true">
          Estudio Jurídico RS
        </span>
      </div>
      <div className="service-card__content">
        <p className="service-card__eyebrow">Área de práctica</p>
        <h3>
          <TransitionLink className="service-card__link" to={to}>
            {title}
          </TransitionLink>
        </h3>
        <p className="service-card__description">{description}</p>
        <span className="service-card__action" aria-hidden="true">
          Conocer servicio <span>→</span>
        </span>
      </div>
    </article>
  );
};

export default Card;
