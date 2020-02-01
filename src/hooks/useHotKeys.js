import { useEffect, useRef } from 'react';

// keyHandlerMap = {
//   key: callback,
//   e.g.
//   'd': () => doThing();
// }

export default function useHotKeys(keyHandlerMap) {
  // TODO verify map is string and functions

  const targets = Object.keys(keyHandlerMap);
  const keydown = useRef(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      // check for long press
      if (keydown.current) return;

      if (targets.includes(key)) {
        keydown.current = true;
        const callback = keyHandlerMap[key];
        callback();
      }
    };

    const upHandler = ({ key }) => {
      if (targets.includes(key)) {
        keydown.current = false;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targets, keyHandlerMap]);
}
