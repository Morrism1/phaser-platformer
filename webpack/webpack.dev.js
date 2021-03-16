// @ts-nocheck
/* eslint-disable */

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true,
    contentBase: './dist',
    hot: true,
  },
}

module.exports = merge(common, dev)
