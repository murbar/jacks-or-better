const bgGradients = {
  blue:
    'radial-gradient(circle at 50% 30%, hsl(213, 80%, 37%) 0%, hsl(212, 85%, 23%) 100%)',
  red: 'radial-gradient(circle at 50% 30%, hsl(13, 91%, 17%) 0%, hsl(15, 80%, 8%) 100%)',
  green:
    'radial-gradient(circle at 50% 30%, hsl(150, 100%, 24%)  0%, hsl(152, 94%, 7%) 100%)'
};

const colors = {
  offWhite: 'hsl(0, 0%, 94%)',
  offBlack: 'hsl(0, 0%, 13%)',
  green: 'hsl(144, 54%, 50%)',
  gold: 'hsl(51, 100%, 50%)',
  goldDark: 'hsl(42, 80%, 50%)',
  red: 'hsl(0, 100%, 38%)',
  blue: 'hsl(213, 80%, 37%)'
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack,
    primary: colors.green,
    highlight: colors.green,
    cardHD: 'hsl(0, 100%, 42%)',
    cardSC: 'hsl(0, 0%, 5%)',
    cardAccent: 'hsl(51, 100%, 70%)'
    // cardAccent: colors.gold
  },
  fonts: {
    body: '"Source Sans Pro", sans-serif',
    display: '"Titan One",  sans-serif',
    cards: 'Montserrat, sans-serif'
  },
  bgGradient: bgGradients.green,
  inputBorderRadius: `0.5rem`
};

export default theme;
