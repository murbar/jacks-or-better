import { addHslAlpha, adjustHsl } from 'styles/helpers';

const colors = {
  offWhite: 'hsl(0, 0%, 94%)',
  green: 'hsl(144, 54%, 50%)',
  gold: 'hsl(48, 95%, 60%)',
  red: 'hsl(0, 100%, 38%)',
  blue: 'hsl(213, 90%, 50%)'
};

describe('Style helpers', () => {
  it('adds alpha to an HSL value', () => {
    expect(addHslAlpha(colors.green, 0.5)).toEqual('hsla(144, 54%, 50%, 0.5)');
  });

  it('adjusts the hue', () => {
    expect(adjustHsl(colors.gold, { h: -10 })).toEqual('hsla(38, 95%, 60%, 1)');
  });

  it('adjusts the lightness', () => {
    expect(adjustHsl(colors.red, { l: 20 })).toEqual('hsla(0, 100%, 58%, 1)');
  });

  it('adjusts the sat', () => {
    expect(adjustHsl(colors.blue, { s: -30 })).toEqual('hsla(213, 60%, 50%, 1)');
  });

  it('adjusts multiple values', () => {
    expect(adjustHsl(colors.offWhite, { h: 50, s: 60, l: -25, a: 0.5 })).toEqual(
      'hsla(50, 60%, 69%, 0.5)'
    );
  });
});
