import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

export default function ValueTween({ children, duration = null }) {
  const precision = 1;
  const friction = 50;
  const config = {
    config: { precision, friction },
    value: children
  };
  if (duration) config.config = { duration };
  const spring = useSpring(config);

  return <animated.span>{spring.value.to(v => Math.ceil(v))}</animated.span>;
}

ValueTween.propTypes = {
  children: PropTypes.number.isRequired
};
