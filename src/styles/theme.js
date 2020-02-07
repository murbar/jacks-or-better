const tableGradients = {
  blue:
    'radial-gradient(circle at 50% 30%, hsl(213, 80%, 37%) 0%, hsl(212, 85%, 23%) 100%)',
  red: 'radial-gradient(circle at 50% 30%, hsl(13, 91%, 24%) 0%, hsl(15, 80%, 12%) 100%)',
  green:
    'radial-gradient(circle at 50% 30%, hsl(150, 100%, 24%)  0%, hsl(152, 94%, 7%) 100%)',
  black: 'radial-gradient(circle at 50% 30%, hsl(0, 0%, 24%)  0%, hsl(0, 0%, 15%) 100%)'
};

const colors = {
  offWhite: 'hsl(0, 0%, 94%)',
  offBlack: 'hsl(0, 0%, 13%)',
  gray: 'hsl(0, 0%, 60%)',
  green: 'hsl(144, 54%, 50%)',
  gold: 'hsl(48, 95%, 60%)',
  red: 'hsl(0, 100%, 38%)',
  blue: 'hsl(213, 90%, 50%)'
};

export const tableOptions = {
  default: tableGradients.green,
  green: tableGradients.green,
  blue: tableGradients.blue,
  red: tableGradients.red,
  black: tableGradients.black
};

export const cardOptions = {
  default: colors.blue,
  green: colors.green,
  blue: colors.blue,
  red: colors.red,
  gray: colors.gray
};

const defaultTheme = {
  colors: {
    ...colors,
    background: colors.offBlack,
    foreground: colors.offWhite,
    primary: colors.gold,
    highlight: colors.green,
    cardHD: 'hsl(0, 100%, 42%)',
    cardSC: 'hsl(0, 0%, 5%)',
    cardBackground: 'white',
    cardBackside: cardOptions.default
  },
  bgGradient: tableOptions.default,
  fonts: {
    body: 'Montserrat, sans-serif',
    display: 'KomicaAxis,  sans-serif',
    cards: 'Montserrat, sans-serif'
  }
};

export default defaultTheme;

export function withUserPreferences(config) {
  config = { tableColor: 'default', cardColor: 'default', ...config };
  const { tableColor, cardColor } = config;
  const theme = { ...defaultTheme };

  if (tableColor in tableOptions) {
    theme.bgGradient = tableOptions[tableColor];
  }

  if (cardColor in cardOptions) {
    theme.colors.cardBackside = cardOptions[cardColor];
  }

  return theme;
}
