import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from 'styles/helpers';
import { randomInRange as random } from 'lib/utils';
import chip1 from 'images/chip1.svg';
import chip5 from 'images/chip5.svg';
import chip10 from 'images/chip10.svg';
import chip25 from 'images/chip25.svg';
import chip100 from 'images/chip100.svg';

const srcMap = {
  1: chip1,
  5: chip5,
  10: chip10,
  25: chip25,
  100: chip100
};

const ChipStyles = styled.div`
  position: absolute;
  top: calc(50% - (var(--chip-size) / 2));
  right: calc(50% - (var(--chip-size) / 2));
  width: var(--chip-size);
  height: var(--chip-size);
  border-radius: 50%;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.7);
  transform: translateY(calc(var(--chip-size) * ${p => p.tY}))
    translateX(calc(var(--chip-size) * ${p => p.tX}));
  transform-origin: center;
  img {
    width: 100%;
    height: auto;
    transform: rotate(${p => p.r}deg);
  }
`;

const Styles = styled.div`
  --chip-size: 4rem;
  --stack-size: calc(var(--chip-size) * 2);
  ${mediaQuery.above.phone`
    --chip-size: 5rem;
  `}
  ${mediaQuery.above.tablet`
    --chip-size: 6rem;
  `}
  position: relative;
  width: var(--stack-size);
  height: var(--stack-size);
`;

const enumerateChips = total => {
  const chips = [];

  Object.keys(srcMap)
    .sort((a, b) => b - a)
    .forEach(v => {
      // randomly vary the number of chips in a stack
      // if (v !== 100 && v !== 1 && random(1, 5) === 1) {
      //   return;
      // }
      while (total >= v) {
        chips.push(v);
        total -= v;
      }
    });

  return chips;
};

const generateTransforms = () => ({
  r: random(0, 359),
  tX: random(-50, 50) / 100,
  tY: random(-50, 50) / 100
});

const Chip = ({ denom }) => {
  // only recalculate transforms when the type of chip changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transforms = React.useMemo(() => generateTransforms(), [denom]);
  const { r, tX, tY } = transforms;

  return (
    <ChipStyles r={r} tX={tX} tY={tY}>
      <img src={srcMap[denom]} alt={`$${denom} chip`} />
    </ChipStyles>
  );
};

export default function ChipStack({ total = 0 }) {
  const chips = React.useMemo(() => enumerateChips(total), [total]);

  return (
    <Styles>
      {chips.map((denom, i) => {
        return <Chip key={i} denom={denom}></Chip>;
      })}
    </Styles>
  );
}
