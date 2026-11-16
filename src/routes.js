import services from './data/services.json' with { type: 'json' };

export const HOME_PATH = '/';
export const CONTACT_PATH = '/contacto';
export const servicePath = (service) => `/servicios/${service.slug}`;
export const findServiceByPath = (pathname) => services.find((service) => servicePath(service) === pathname);

/** Direcciones antiguas que redirigen a la nueva ruta (también en vercel.json y server.mjs). */
export const legacyRedirects = [
  { source: '/home', destination: HOME_PATH },
  { source: '/contact', destination: CONTACT_PATH },
];
