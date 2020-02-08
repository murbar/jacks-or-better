const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomFillSync(arr, 0, arr.length, () => {})
  }
});
