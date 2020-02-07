import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import theme from 'styles/theme';
import { adjustHslLightness, addHslAlpha, adjustHsl } from 'styles/helpers';

const activeWhite = 'hsl(62, 74%, 90%)';
const disabledColor = 'hsl(0, 0%, 70%)';
// const activeBlue = 'hsl(213, 95%, 80%)';

const gradient = (color, lightDelta = 8) =>
  `radial-gradient(ellipse,  ${adjustHslLightness(color, lightDelta)}, ${color})`;

const depth = '0.8rem';
const borderRadius = '0.5rem';
const textColor = theme.colors.offBlack;

const dropShadow = depth => `0 ${depth} 1rem rgba(0, 0, 0, 0.5)`;

const insetShadow = `0 1.5em 0 0 rgba(255, 255, 255, 0.5) inset, 0 -0.25rem 1rem -0.25rem rgba(0,0,0,0.5 ) inset`;

const baseShadowActive = (depth, color) =>
  ` 0 ${depth} ${adjustHsl(color, { l: -15, s: -30 })}`;

const baseShadowDisabled = (depth, color) =>
  ` 0 ${depth} ${adjustHsl(color, { l: -5, s: -5 })}`;

const activeShadows = depth =>
  `${baseShadowActive(depth, activeWhite)}, ${insetShadow}, ${dropShadow(
    depth
  )}, 0 ${depth} 1rem ${activeWhite}`;

const disabledShadows = depth =>
  `${baseShadowDisabled(depth, disabledColor)}, ${insetShadow}, ${dropShadow(depth)}`;

const pulseKeyframes = keyframes`
  to { box-shadow:  0 0 1.25rem ${activeWhite}; }
`;

const pulse = css`
  animation: ${pulseKeyframes} 0.75s alternate infinite;
`;

const Container = styled.div`
  display: inline-flex;
  margin: 1rem 1rem 1rem 0;
  border-radius: ${borderRadius};
  padding-bottom: ${depth};

  &:last-child {
    margin-right: 0;
  }
  &:active {
    padding-bottom: 0;
    margin-bottom: calc(1rem + ${depth});
    transform: translateY(${depth});
    box-shadow: ${activeShadows(0)};
  }

  ${p => p.pulse && pulse}
`;

const Styles = styled.button`
  width: 100%;
  height: 100%;
  font-family: ${p => p.theme.fonts.cards};
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
  color: ${addHslAlpha(textColor, 0.8)};
  padding: 1.25rem 2.5rem;
  background: ${gradient(activeWhite, 15)};
  border: 0.1rem solid rgba(0, 0, 0, 0.15);
  border-radius: ${borderRadius};
  box-shadow: ${activeShadows(depth)};
  outline: none;

  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: ${activeShadows(0)};
  }
  &:disabled {
    color: ${textColor};
    background: ${gradient(disabledColor)};
    box-shadow: ${disabledShadows(depth)};
  }
`;

export default function Button({ children, pulse, ...props }) {
  return (
    <Container pulse={pulse}>
      <Styles {...props}>{children}</Styles>
    </Container>
  );
}
