// module.exports = {
//   plugins: extendDefaultPlugins([
//     {
//       name: 'prefixIds',
//       active: true,
//     },
//     {
//       name: 'removeTitle',
//       active: false,
//     },
//     {
//       name: 'removeViewBox',
//       active: false,
//     },
//   ]),
// };
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
