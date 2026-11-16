const homeWidths = [640, 960, 1280, 1920];
const serviceWidths = [360, 480, 640, 800, 1200];

export const getResponsiveImageProps = (src, sizes) => {
  const match = src.match(/^(.*)-(\d+)\.webp$/);
  if (!match) return { src, sizes };

  const [, base, maxWidthText] = match;
  const maxWidth = Number(maxWidthText);
  const availableWidths = src.includes('/home/') ? homeWidths : serviceWidths;
  const widths = [...new Set([...availableWidths.filter((width) => width < maxWidth), maxWidth])]
    .sort((a, b) => a - b);

  return {
    src,
    srcSet: widths.map((width) => `${base}-${width}.webp ${width}w`).join(', '),
    sizes,
  };
};

export default getResponsiveImageProps;
