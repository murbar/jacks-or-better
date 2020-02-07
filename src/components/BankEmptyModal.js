import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import FullScreenModal from 'components/FullScreenModal';
import { effect3dSmall } from 'styles/helpers';

const Styles = styled.div`
  width: 100%;
  padding: 1rem;
  h2 {
    font-size: 2em;
    color: ${p => p.theme.colors.gold};
    margin-top: 0;
    margin-bottom: 4rem;
    text-align: center;
    ${p => effect3dSmall(p.theme.colors.gold)};
  }
  text-align: center;
`;

export default function BankEmptyModal({ isShowing = true, onAccept }) {
  const [showModal, setShowModal] = useState(isShowing);

  useEffect(() => {
    setShowModal(isShowing);
  }, [isShowing]);

  const accept = () => {
    setShowModal(false);
    onAccept();
  };

  return (
    <FullScreenModal onClickOff={accept} isShowing={showModal}>
      <Styles>
        <h2>You're out of cash!</h2>

        <Button onClick={accept} title="Get more cash">
          Get More Cash
        </Button>
      </Styles>
    </FullScreenModal>
  );
}
