const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackMerge = require('webpack-merge')
const configPatch = require('./tool/getPages')()
const { staticPath, cdnStaticPath } = require('./tool/config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

console.log('webpack env:' + process.env.WEBPACK_ENV)

const assetsPath = process.env.WEBPACK_ENV === 'production' ? cdnStaticPath : staticPath;

module.exports = function () {
  let config =  {
    context: __dirname,
    entry: {
      // vendor: ['react', 'react-dom', 'react-router-dom'],
      // to be merged
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: `${assetsPath}/static`,
      filename: 'js/[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    node: {
      net: 'empty',
      dns: 'empty'
    },
    stats: 'minimal',
    devServer: {
      contentBase: './build',
      publicPath: `${assetsPath}/static`,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: [/node_modules/, /build/, /client/]
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader?sourceMap',
          exclude: [/node_modules/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                outputPath: "image/",
                publicPath: `${assetsPath}/static/image`
              }
            }
          ]
        },
        {
          test: /\.(woff|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'file-loader',
              query: {
                // limit: 10000,
                outputPath: "font/",
                publicPath: `${assetsPath}/static/font`
              }
            }
          ]
        }
      ]
    },
    // devtool: 'cheap-module-source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 400000,
      maxAssetSize: 300000
    },
    plugins: [

      // new webpack.LoaderOptionsPlugin({
      //   minimize: true,
      //   debug: false
      // }),

      new ExtractTextPlugin('css/[name].css'),

      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './dll/static/*.js'),
        includeSourcemap: false,
        outputPath: `js/common`,
        publicPath: `${assetsPath}/static/js/common`,
      }),
      
      // new webpack.ProvidePlugin({}),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   filename: 'js/common/vendor.[chunkhash:5].js',
      //   minChunks: Infinity
      // }),

      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./dll/manifest.json'),
      }),

      // new BundleAnalyzerPlugin()
    ]
  }
  return webpackMerge(config, configPatch)
}
