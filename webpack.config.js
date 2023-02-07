const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'sponsors/load.test': './src/tests/api/sap/sponsors/sponsors_load.test.js',
    'sponsors/stress.test': './src/tests/api/sap/sponsors/sponsors_stress.test.js',
    'sponsors/smoke.test': './src/tests/api/sap/sponsors/sponsors_smoke.test.js',
    'orders/load.test': './src/tests/api/operations/orders/orders_load.test.js'
    
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
