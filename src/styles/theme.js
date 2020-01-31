import { media } from './helpers';

const colors = {
  offWhite: '#efefef',
  offBlack: '#222',
  green: '#3cc473',
  red: '#bf0000'
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack,
    primary: colors.green
  },
  bgGradient: 'radial-gradient(circle, rgba(67,125,235,1) 0%, rgba(0,62,179,1) 100%)',
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Source Sans Pro', sans-serif",
  media
};

export default theme;
