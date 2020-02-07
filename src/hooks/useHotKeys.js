import React from 'react';

// keyHandlerMap = {
//   key: callback,
//   e.g.
//   'd': () => doThing();
// }

function validateKeyMap(map) {
  if (!map) {
    throw new TypeError('Key map is required');
  }

  for (const key in map) {
    if (!(typeof key === 'string') || !(typeof map[key] === 'function')) {
      throw new TypeError(
        'Key map must be on object with strings as keys and callback functions as values'
      );
    }
  }
}

export default function useHotKeys(keyHandlerMap) {
  validateKeyMap(keyHandlerMap);

  const keydown = React.useRef(false);

  React.useEffect(() => {
    const downHandler = e => {
      const { key } = e;
      // check for long press
      if (keydown.current) return;

      if (key in keyHandlerMap) {
        keydown.current = true;
        const callback = keyHandlerMap[key];
        callback(e);
      }
    };

    const upHandler = ({ key }) => {
      if (key in keyHandlerMap) {
        keydown.current = false;
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyHandlerMap]);
}
