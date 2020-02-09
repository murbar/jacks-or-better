import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    position: relative;
    background-image: repeating-linear-gradient(
      45deg, transparent, transparent 2rem, rgba(0,0,0,0.02) 2rem, rgba(0,0,0,0.02) 4rem),
      ${p => p.theme.bgGradient};
    background-attachment: fixed;
    color: ${p => p.theme.colors.foreground};
    font-family: ${p => p.theme.fonts.body};
    font-size: 1.8rem;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${p => p.theme.fonts.display};
    line-height: 1.3;
    font-weight: normal;
  }
  a {
    color: inherit;
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
  @media (min-width: 133.33vw) {
  /* the zoom level in Safari is at most 75% */
  html {
    /* Something smaller than usual */
    font-size: 0.8em;
  }
}
`;
