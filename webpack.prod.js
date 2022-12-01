const { merge } = require('webpack-merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common');
// const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      '...',
    ],
  },
});
