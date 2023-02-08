const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'sponsors/sponsor_load.test': './src/tests/api/sponsors/payables_load.test.js',
    'sponsors/sponsor_stress.test': './src/tests/api/sponsors/payables_stress.test.js',
    'sponsors/sponsor_smoke.test': './src/tests/api/sponsors/payables_smoke.test.js',
    'operations/orders_load.test': './src/tests/api/operations/orders_load.test.js',
    'operations/orders_stress.test': './src/tests/api/operations/orders_stress.test.js'

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
