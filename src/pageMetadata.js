import studio from './data/studio.json' with { type: 'json' };
import { imageUrl } from './utils/responsiveImage.js';

// Títulos y descripciones compartidos por las páginas y por el prerender.
export const HOME_PAGE = {
  title: `${studio.name} | Asesoramiento legal`,
  description: `Conocé las áreas de práctica de ${studio.name} y encontrá información para iniciar tu consulta.`,
  image: imageUrl('justice-gavel'),
};

export const CONTACT_PAGE = {
  title: `Contacto | ${studio.name}`,
  description: `Contactá a ${studio.name} para iniciar una consulta por WhatsApp o redes sociales.`,
};

export const NOT_FOUND_PAGE = {
  title: `Página no encontrada | ${studio.name}`,
  description: 'La página que buscás no está disponible. Volvé al inicio o contactá al estudio.',
};

export const servicePage = (service) => ({
  title: `${service.title} | ${studio.name}`,
  description: service.description,
  image: imageUrl(service.image),
});
