import { css } from 'styled-components';

export const DEVICE_SIZES = {
  desktopXL: 1800,
  desktop: 1200,
  tablet: 900,
  phone: 625,
  px350: 350,
  px400: 400,
  px450: 450,
  px500: 500,
  px550: 550,
  px600: 600,
  px650: 650,
  px700: 700,
  px750: 750,
  px800: 800,
  px850: 850,
  px900: 900,
  px950: 950,
  px1100: 1100
};

// Iterate DEVICE_SIZES and create a media template
export const mediaAbove = Object.keys(DEVICE_SIZES).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${DEVICE_SIZES[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const mediaBelow = Object.keys(DEVICE_SIZES).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${DEVICE_SIZES[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

const parseHslString = hsl => {
  const values = /hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*)?([\d.]+)?\)/g.exec(hsl);
  if (values) {
    return values.slice(1).map(v => (v === undefined ? null : Number(v)));
  } else {
    console.warn('Invalid HSL value, returning black');
    return [0, 0, 0, 0];
  }
};

export const addHslAlpha = (hsl, alpha) => {
  return `${hsl.slice(0, -1)}, ${alpha})`;
};

export const adjustHslLightness = (hsl, delta) => {
  const [h, s, l, a] = parseHslString(hsl);
  const lum = l + delta;
  return a === null ? `hsl(${h}, ${s}%, ${lum}%)` : `hsla(${h}, ${s}%, ${lum}%, ${a})`;
};
