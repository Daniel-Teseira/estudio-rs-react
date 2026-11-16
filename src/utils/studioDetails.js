import studio from '../data/studio.json' with { type: 'json' };

/** Dirección legible a partir de los campos completados en studio.json. */
export const fullAddress = () => [studio.address, studio.city, studio.province].filter(Boolean).join(', ');

/** Datos profesionales que se muestran solo si están completados en studio.json. */
export const professionalDetails = () => [
  { label: 'Abogada/o', value: studio.lawyer },
  { label: 'Matrícula', value: studio.registration },
  { label: 'Dirección', value: fullAddress() },
  { label: 'Horario de atención', value: studio.hours },
].filter(({ value }) => value);
