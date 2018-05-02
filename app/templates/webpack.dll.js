const webpack = require('webpack');
const path = require('path')

const vendor = [
  'react', 
  'react-dom', 
  'react-router-dom'
]

module.exports = {
  output: {
    path: path.join(__dirname, 'dll/static'),
    filename: '[name].[chunkhash:5].js',
    library: '[name]_[chunkhash:5]',
  },
  entry: {
    vendor
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', 'manifest.json'),
      name: '[name]_[chunkhash:5]',
      context: __dirname,
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
  ],
};