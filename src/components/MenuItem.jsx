import styled from 'styled-components';

export default styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    transform: scale(1.15);
  }
  svg {
    color: ${p => p.theme.colors.primary};
    width: 1.5em;
    height: auto;
  }
`;
