import styled, { css, keyframes } from 'styled-components';

const shadow = '0 0 1rem rgba(0, 0, 0, 0.5)';

const pulseKeyframes = keyframes`
  from {  box-shadow: ${shadow}; }
  to { box-shadow: 0 0 1.5rem yellow; }
`;

const pulse = css`
  animation: ${pulseKeyframes} 0.75s alternate infinite;
`;

export default styled.button`
  font-size: 1em;
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  background: ${p => p.theme.colors.offWhite};
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
