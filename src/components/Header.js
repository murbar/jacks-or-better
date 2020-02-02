import React from 'react';
import styled from 'styled-components';

const Styles = styled.header`
  color: #eee;
`;

export default function Header() {
  return (
    <Styles>
      <h1>Jacks or Better</h1>
    </Styles>
  );
}
