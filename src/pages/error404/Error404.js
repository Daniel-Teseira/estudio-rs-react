import './Error404.css';
import TransitionLink from '../../components/TransitionLink/TransitionLink';

const Error404 = () => (
  <main className="not-found-page">
    <section className="not-found-card" aria-labelledby="not-found-title">
      <div className="not-found-card__visual" aria-hidden="true">
        <span className="not-found-card__mark">RS</span>
        <span className="not-found-card__number">404</span>
        <span className="not-found-card__caption">ESTUDIO JURÍDICO</span>
      </div>

      <div className="not-found-card__content">
        <p className="not-found-card__eyebrow">PÁGINA NO ENCONTRADA</p>
        <h1 id="not-found-title">Este camino no lleva a donde buscabas.</h1>
        <p className="not-found-card__description">
          El enlace puede estar vencido o la página ya no existe. Estamos para
          ayudarte a encontrar la información que necesitás.
        </p>
        <div className="not-found-card__actions">
          <TransitionLink className="not-found-button not-found-button--primary" to="/home">
            Volver a Inicio <span aria-hidden="true">→</span>
          </TransitionLink>
          <TransitionLink className="not-found-button not-found-button--secondary" to="/contact">
            Contactar al estudio
          </TransitionLink>
        </div>
        <p className="not-found-card__reference">ERROR 404 <span>·</span> DIRECCIÓN NO DISPONIBLE</p>
      </div>
    </section>
  </main>
);

export default Error404;
