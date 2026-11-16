import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Contact.css';
import services from '../../data/services.json';
import studio from '../../data/studio.json';
import usePageMetadata from '../../hooks/usePageMetadata';
import whatsappUrl from '../../utils/whatsapp';
import { CONTACT_PAGE } from '../../pageMetadata';
import { professionalDetails } from '../../utils/studioDetails';

const OTHER_AREA = 'otra';

export const Contact = () => {
  usePageMetadata(CONTACT_PAGE.title, CONTACT_PAGE.description);
  const [searchParams] = useSearchParams();
  const [area, setArea] = useState('');

  // Se aplica después de hidratar para que el HTML prerenderizado coincida.
  useEffect(() => {
    const requested = searchParams.get('area');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (services.some((service) => service.slug === requested)) setArea(requested);
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selected = services.find((service) => service.slug === formData.get('area'));
    const message = [
      `Hola, soy ${formData.get('name')}.`,
      `Área de consulta: ${selected ? selected.title : 'Otra consulta'}.`,
      `Consulta: ${formData.get('message')}`,
    ].join('\n');

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  };

  const details = professionalDetails();

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
            Cada consulta merece atención y claridad. Elegí un canal y escribinos brevemente
            qué necesitás para iniciar la conversación.
          </p>
          <a className="contact-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="contact-lower" aria-label="Información y formulario de contacto">
        <aside className="contact-details">
          <p className="contact-eyebrow">CONTACTO DIRECTO</p>
          <h2>Estamos cerca.</h2>
          <p>Elegí el canal que te resulte más cómodo para iniciar tu consulta.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            <span className="contact-details__label">WhatsApp</span>
            <span>{studio.phoneDisplay}</span>
          </a>
          {studio.email && (
            <a href={`mailto:${studio.email}`}>
              <span className="contact-details__label">Correo electrónico</span>
              <span>{studio.email}</span>
            </a>
          )}
          {studio.social.map(({ network, handle, url }) => (
            <a key={network} href={url} target="_blank" rel="noopener noreferrer">
              <span className="contact-details__label">{network}</span>
              <span>{handle}</span>
            </a>
          ))}
          {details.map(({ label, value }) => (
            <p key={label} className="contact-details__item">
              <span className="contact-details__label">{label}</span>
              <span>{value}</span>
            </p>
          ))}
        </aside>

        <div className="contact-form-card">
          <p className="contact-eyebrow">CONTANOS</p>
          <h2>¿En qué podemos ayudarte?</h2>
          <p className="contact-form-card__description">
            Completá tus datos y prepararemos el mensaje para enviarlo por WhatsApp.
          </p>
          <form className="contact-form" onSubmit={handleSubmit} aria-describedby="contact-form-delivery-note">
            <div className="contact-form__row">
              <label>
                Nombre
                <input type="text" name="name" autoComplete="name" placeholder="Tu nombre" required />
              </label>
              <label>
                Área de consulta
                <select name="area" value={area} onChange={(event) => setArea(event.target.value)} required>
                  <option value="" disabled>Elegí un área</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>{service.title}</option>
                  ))}
                  <option value={OTHER_AREA}>Otra consulta</option>
                </select>
              </label>
            </div>
            <label>
              Mensaje
              <textarea name="message" rows="5" placeholder="Escribinos cómo podemos ayudarte..." required />
            </label>
            <button type="submit" className="contact-whatsapp contact-form__submit">
              Preparar mensaje <span aria-hidden="true">→</span>
            </button>
            <p className="contact-form__note" id="contact-form-delivery-note">
              Al continuar, se abrirá WhatsApp con el mensaje preparado. Solo se enviará
              cuando lo confirmes desde esa aplicación. Evitá incluir documentación o datos
              sensibles en el primer mensaje.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};
