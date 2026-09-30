import './Card.css';

const Card = ({ description, title, picture, id, reverse = false }) => {
  return (
    <article
      className={`service-card${reverse ? ' service-card--reverse' : ''}`}
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="service-card__media">
        <img src={picture} alt={`Área de práctica: ${title}`} />
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
