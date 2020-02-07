import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { mediaQuery } from 'styles/helpers';
import { ReactComponent as XIcon } from 'images/x-circle-icon.svg';

const CloseControl = styled.div`
  position: absolute;
  z-index: 5000;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  cursor: pointer;
  svg {
    width: 1.75em;
    height: auto;
  }
`;

const OverlayBox = styled.div`
  color: ${p => p.theme.colors.foreground};
  padding: 1rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3);
  background: ${p => p.theme.colors.background};
  border-radius: 1rem;
  margin-bottom: 1rem;
  position: relative;
  pointer-events: auto;
  overflow: scroll;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  &:last-child {
    margin-bottom: 0;
  }
  h2 {
    margin: 0;
  }
  ${mediaQuery.above.phone`
    max-width: 50rem;
  `} /* breakpoint for width on large screen */
`;

const Styles = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.25);
  pointer-events: auto;
  overflow: scroll;
  transform: scale(1);
  will-change: transform, opacity;
`;

export default function FullScreenModal({
  children,
  onClickOff,
  isShowing,
  closeControl = true
}) {
  const DOM_ID = 'modal';
  const overlayTransition = useTransition(isShowing, null, {
    config: { precision: 0.001 },
    from: {
      opacity: 0,
      transform: 'scale(1.15)'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(1.15)'
    }
  });

  return overlayTransition.map(
    ({ item, key, props }) =>
      item &&
      ReactDOM.createPortal(
        <Styles
          style={props}
          key={key}
          onClick={e => {
            if (e.target.parentNode.id === DOM_ID) onClickOff(e);
          }}
        >
          <OverlayBox style={props} key={key}>
            {closeControl && (
              <CloseControl role="button" onClick={() => onClickOff()}>
                <XIcon />
              </CloseControl>
            )}
            {children}
          </OverlayBox>
        </Styles>,
        document.querySelector(`#${DOM_ID}`)
      )
  );
}
