import { addHslAlpha, adjustHsl } from 'styles/helpers';

const hsl1 = 'hsl(150, 50%, 50%)';

describe('Style helpers', () => {
  it('add alpha to an HSL value', () => {
    expect(addHslAlpha(hsl1, 0.5)).toEqual('hsla(150, 50%, 50%, 0.5)');
  });
});
