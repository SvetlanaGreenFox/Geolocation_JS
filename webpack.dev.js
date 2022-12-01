/* eslint linebreak-style: ["error", "windows"] */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
  // Control how source maps are generated
  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '/dist'),
    open: true,
    compress: true,
    port: 9000,
    hot: true,
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
