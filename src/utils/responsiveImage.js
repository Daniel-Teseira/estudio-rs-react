import images from '../data/images.json' with { type: 'json' };

const imageEntry = (name) => {
  const entry = images[name];
  if (!entry) throw new Error(`Imagen no configurada: ${name}`);
  return entry;
};

const variantUrl = (name, width) => `/images/${imageEntry(name).folder}/${name}-${width}.webp`;

/** URL de la variante más grande, útil para metadatos sociales. */
export const imageUrl = (name) => variantUrl(name, Math.max(...imageEntry(name).widths));

export const getResponsiveImageProps = (name, sizes) => {
  const widths = [...imageEntry(name).widths].sort((a, b) => a - b);
  return {
    src: imageUrl(name),
    srcSet: widths.map((width) => `${variantUrl(name, width)} ${width}w`).join(', '),
    sizes,
  };
};

export default getResponsiveImageProps;
