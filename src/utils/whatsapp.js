import studio from '../data/studio.json' with { type: 'json' };

/** Enlace de WhatsApp al estudio, con un mensaje opcional ya escrito. */
export const whatsappUrl = (message) => {
  const base = `https://wa.me/${studio.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export default whatsappUrl;
