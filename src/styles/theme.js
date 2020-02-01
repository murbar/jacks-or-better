import { media } from './helpers';

const colors = {
  offWhite: 'hsl(0, 0%, 94%)',
  offBlack: 'hsl(0, 0%, 13%)',
  green: 'hsl(144, 54%, 50%)',
  red: 'hsl(0, 100%, 38%)'
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
