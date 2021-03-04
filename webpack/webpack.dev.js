const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    writeToDisk: true,
    open: true,
    hot: true,
  },
}

module.exports = merge(common, dev)
