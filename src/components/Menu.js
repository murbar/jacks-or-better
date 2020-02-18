import styled from 'styled-components';
import { revealGame } from 'styles/animations';
import { mediaQuery } from 'styles/helpers';

export default styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 1rem;
  z-index: 100;
  & > div {
    margin: 0 0.25rem;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  ${revealGame}
  ${mediaQuery.above.phone`
    right: 15rem;
  `}
`;
