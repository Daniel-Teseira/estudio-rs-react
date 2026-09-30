import './Contact.css';

const WHATSAPP_NUMBER = '543813019431';

export const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Hola, soy ${formData.get('name')}.`,
      `Mi correo es ${formData.get('email')}.`,
      `Asunto: ${formData.get('subject') || 'Consulta legal'}.`,
      `Consulta: ${formData.get('message')}`,
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="contact-page">
      <section className="contact-intro" aria-labelledby="contact-title">
        <div className="contact-intro__visual" aria-hidden="true">
          <span className="contact-intro__mark">RS</span>
          <span className="contact-intro__ornament" />
          <span className="contact-intro__caption">ESTUDIO JURÍDICO</span>
        </div>
        <div className="contact-intro__content">
          <p className="contact-eyebrow">ESTAMOS PARA ACOMPAÑARTE</p>
          <h1 id="contact-title">Hablemos de tu situación.</h1>
          <p className="contact-lead">
            Cada consulta merece atención y claridad. Contanos brevemente qué necesitás
            y nos pondremos en contacto para orientarte.
          </p>
          <a
            className="contact-whatsapp"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            Escribir por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contact-lower" aria-label="Información y formulario de contacto">
        <aside className="contact-details">
          <p className="contact-eyebrow">CONTACTO DIRECTO</p>
          <h2>Estamos cerca.</h2>
          <p>Elegí el canal que te resulte más cómodo para iniciar tu consulta.</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
            <span className="contact-details__label">WhatsApp</span>
            <span>+54 9 381 301-9431</span>
          </a>
          <a href="https://www.instagram.com/rocio_sosa_97/" target="_blank" rel="noreferrer">
            <span className="contact-details__label">Instagram</span>
            <span>@rocio_sosa_97</span>
          </a>
        </aside>

        <div className="contact-form-card">
          <p className="contact-eyebrow">CONTANOS</p>
          <h2>¿En qué podemos ayudarte?</h2>
          <p className="contact-form-card__description">
            Completá tus datos y prepararemos el mensaje para enviarlo por WhatsApp.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <label>
                Nombre
                <input type="text" name="name" autoComplete="name" placeholder="Tu nombre" required />
              </label>
              <label>
                Correo electrónico
                <input type="email" name="email" autoComplete="email" placeholder="tu@email.com" required />
              </label>
            </div>
            <label>
              Asunto <span className="contact-form__optional">(opcional)</span>
              <input type="text" name="subject" placeholder="Área o motivo de consulta" />
            </label>
            <label>
              Mensaje
              <textarea name="message" rows="5" placeholder="Escribinos cómo podemos ayudarte..." required />
            </label>
            <button type="submit" className="contact-whatsapp contact-form__submit">
              Preparar mensaje <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
