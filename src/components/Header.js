import React from 'react';
import styled from 'styled-components';

const Styles = styled.header`
  color: #eee;
  position: absolute;
  width: 50%;
  top: 1rem;
  right: 25%;
  font-size: 1rem;
  text-align: center;
`;

export default function Header() {
  return (
    <Styles>
      <h1>Jacks or Better</h1>
    </Styles>
  );
}
