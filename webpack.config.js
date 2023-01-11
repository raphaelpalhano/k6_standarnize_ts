const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'sponsors/load.test': './tests/api/sap/sponsors/sponsors_load.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  target: 'web',
  externals: /k6(\/.*)?/,
};
