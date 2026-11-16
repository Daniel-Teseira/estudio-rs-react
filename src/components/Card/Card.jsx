import './Card.css';
import useScrollReveal from '../../hooks/useScrollReveal';
import getResponsiveImageProps from '../../utils/responsiveImage';

const Card = ({ description, title, picture, id, reverse = false }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`service-card${reverse ? ' service-card--reverse' : ''}${isVisible ? ' service-card--visible' : ''}`}
    >
      <div className="service-card__media">
        <img
          {...getResponsiveImageProps(picture, '(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 42vw')}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="service-card__number">{String(id).padStart(2, '0')}</span>
        <span className="service-card__media-label">Estudio Jurídico RS</span>
      </div>
      <div className="service-card__content">
        <p className="service-card__eyebrow">Área de práctica</p>
        <h2>{title}</h2>
        <p className="service-card__description">{description}</p>
        <span className="service-card__action">
          Conocer servicio <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
};

export default Card;
