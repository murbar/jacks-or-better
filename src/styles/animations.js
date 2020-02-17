import { css, keyframes } from 'styled-components';

export const slideInDown = keyframes`
  from {
    transform: translate3d(0, -100%, 0) scale(0.5);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const slideInLeft = keyframes`
  from {
    transform: translate3d(-100%, 0, 0) scale(0.5);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0)  scale(0.5);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const tada = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }
  10%, 20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
`;

export const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -2rem, 0);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -1rem, 0);
  }
  90% {
    transform: translate3d(0, -0.5rem, 0);
  }
}`;

export const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.6, 1.6, 1.6);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const revealGame = css`
  opacity: 0;
  animation: ${fadeIn} 750ms 1000ms forwards;
`;

export const slideLogo = keyframes`
  from {
    opacity: 0;
  }
  33% {
    opacity: 1;
  }
  66% {
    transform: translate3d(0, 250%, 0) scale(2.5);
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
  }
`;

export const introLogo = css`
  transform: translate3d(0, 250%, 0) scale(2.5);
  animation: ${slideLogo} 1500ms forwards;
`;
