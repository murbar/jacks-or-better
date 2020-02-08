import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { mediaQuery } from 'styles/helpers';

const Styles = styled.div`
  display: flex;
  /* overflow: hidden; */

  ${mediaQuery.above.phone`

  `}
`;

const ChoiceButton = styled.button`
  border: none;
  background: ${p => p.color};
  cursor: pointer;
  margin: 1rem;
  width: 8rem;
  height: 5rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.5);

  &:hover {
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.5), 0 0 0 0.4rem white inset;
  }
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  &:focus {
    outline: none;
  }
  ${p =>
    p.selected &&
    css`
      box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.5), 0 0 0 0.4rem white inset;
      cursor: default;
    `}
`;

export default function ColorChoiceToggle({ choices, onToggle, initialChoice }) {
  const labels = Object.keys(choices);
  const [selected, setSelected] = React.useState(initialChoice);

  const handleClick = label => {
    setSelected(label);
    onToggle(label);
  };

  return (
    <Styles>
      {labels.map(l => (
        <ChoiceButton
          key={l}
          selected={selected === l}
          color={choices[l]}
          onClick={() => handleClick(l)}
          title={`Set to ${l}`}
        />
      ))}
    </Styles>
  );
}

ColorChoiceToggle.propTypes = {
  choices: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  initialChoice: PropTypes.string.isRequired
};
