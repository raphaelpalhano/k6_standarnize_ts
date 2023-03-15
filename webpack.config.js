const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'sponsors/payables/load.test': './src/tests/api/sponsors/payables/load.test.js',
    'sponsors/payables/stress.test': './src/tests/api/sponsors/payables/stress.test.js',
    'sponsors/payables/smoke.test': './src/tests/api/sponsors/payables/smoke.test.js',
    'operations/orders/load.test': './src/tests/api/operations/orders/load.test.js',
    'operations/orders/stress.test': './src/tests/api/operations/orders/stress.test.js'

  },
  devtool: false,
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
    clean: true,
    globalObject: 'this',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  stats: {
    colors: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
 },
  target: 'web',
  externals: /k6(\/.*)?/,
};
