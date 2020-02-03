import styled, { css, keyframes } from 'styled-components';
import theme from 'styles/theme';

const { highlight, offWhite } = theme.colors;
const shadow = '0 0 1rem rgba(0, 0, 0, 0.5)';

const pulseKeyframes = keyframes`
  from {  box-shadow: ${shadow}; }
  to { box-shadow: 0 0 1.5rem ${highlight}; }
`;

const pulse = css`
  animation: ${pulseKeyframes} 0.75s alternate infinite;
`;

export default styled.button`
  font-family: ${p => p.theme.fonts.cards};
  font-size: 1.1em;
  font-weight: bold;
  border: none;
  padding: 1.25rem 2.5rem;
  background: ${offWhite};
  border-radius: 0.25rem;
  margin: 1rem 1rem 1rem 0;
  box-shadow: ${shadow};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }

  ${p => p.pulse && pulse}
`;
