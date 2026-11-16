import './Privacy.css';
import studio from '../../data/studio.json';
import usePageMetadata from '../../hooks/usePageMetadata';
import whatsappUrl from '../../utils/whatsapp';
import { PRIVACY_PAGE } from '../../pageMetadata';

const LAST_UPDATED = '16 de noviembre de 2026';

const Privacy = () => {
  usePageMetadata(PRIVACY_PAGE.title, PRIVACY_PAGE.description);

  return (
    <main className="legal-page">
      <article className="legal-page__content container">
        <p className="legal-page__eyebrow">Información legal</p>
        <h1>Política de privacidad</h1>
        <p className="legal-page__updated">Última actualización: {LAST_UPDATED}</p>

        <h2>Responsable</h2>
        <p>
          {studio.name} es responsable de los datos personales que nos compartas al realizar una consulta. Podés
          comunicarte por{' '}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          {studio.email && (
            <>
              {' '}
              o por correo a <a href={`mailto:${studio.email}`}>{studio.email}</a>
            </>
          )}
          .
        </p>

        <h2>Qué datos recibimos</h2>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> el sitio no envía tus datos al estudio. Arma un mensaje que se abre
            en WhatsApp y solo se envía si lo confirmás desde esa aplicación.
          </li>
          <li>
            <strong>Mensajes por WhatsApp o redes sociales:</strong> recibimos lo que decidas escribirnos. Esas
            plataformas tratan los datos según sus propias políticas.
          </li>
          <li>
            <strong>Registros técnicos:</strong> para detectar fallas, el sitio registra errores del navegador y tiempos
            de carga, junto con la página visitada. No incluyen tu nombre ni el contenido del formulario. La dirección
            IP se usa de forma temporal para limitar envíos abusivos y no se guarda en esos registros.
          </li>
        </ul>
        <p>El sitio no usa cookies ni herramientas de publicidad o de analítica de terceros.</p>

        <h2>Para qué los usamos</h2>
        <p>
          Usamos los datos solo para responder tu consulta y, si corresponde, para brindarte el servicio profesional.
          Toda la información está protegida por el secreto profesional y no se cede a terceros, salvo obligación legal.
        </p>

        <h2>Tus derechos</h2>
        <p>
          De acuerdo con la Ley N.º 25.326 de Protección de los Datos Personales, podés solicitar el acceso, la
          rectificación, la actualización o la supresión de tus datos escribiéndonos por los canales indicados arriba.
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley N.º 25.326, tiene
          la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos
          por incumplimiento de las normas vigentes en materia de protección de datos personales.
        </p>
      </article>
    </main>
  );
};

export default Privacy;
