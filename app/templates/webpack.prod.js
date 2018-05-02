const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const commonConfig = require('./webpack.config.js')

module.exports = function (env) {

  console.log(env)

  return webpackMerge(commonConfig(), {
    output: {
      filename: 'js/[name].[chunkhash:5].js'
    },
    devtool: false,
    plugins: [
      new ExtractTextPlugin('css/[name].[contenthash:5].css'),
      
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      // new CompressionPlugin({
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
    ]
  })
}
