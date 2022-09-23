import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const portalRoot = document.querySelector('#modal');

export default function Portal({ children }) {
  const el = useRef(null);
  if (!el.current) {
    el.current = document.createElement('div');
    el.current.id = 'modal-container';
  }

  useEffect(() => {
    portalRoot.appendChild(el.current);
    return () => portalRoot.removeChild(el.current);
  }, []);

  return ReactDOM.createPortal(children, el.current);
}

Portal.propTypes = {
  children: PropTypes.node
};
