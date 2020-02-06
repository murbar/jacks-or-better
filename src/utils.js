export const isTruthy = value => !!value;
export const isFalsy = value => !!!value;

export const getIndexes = (array, filter) =>
  array.reduce((indexes, value, i) => (filter(value) ? [...indexes, i] : indexes), []);

export const randomInRange = (start, end) =>
  Math.floor(Math.random() * (1 + end - start)) + start;
