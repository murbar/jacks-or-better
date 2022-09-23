module.exports = {
  plugins: [
    'prefixIds',
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false,
          removeViewBox: false,
        },
      },
    },
  ],
};
