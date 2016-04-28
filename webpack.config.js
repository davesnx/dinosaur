require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = process.env.DEBUG
const ENV = process.env.ENV

const PATH = {
  src: path.resolve(__dirname, 'app'),
  client: path.resolve(__dirname, 'app', 'client'),
  build: path.resolve(__dirname, 'dist')
}

module.exports = {
  devtool: 'inline-source-map',
  debug: DEBUG,
  process: true,
  inline: true,
  stats: {
    colors: true
  },
  entry: [
    'webpack/hot/only-dev-server',
    path.resolve(PATH.client, 'main.js')
  ],
  output: {
    path: PATH.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   path: path.resolve(__dirname, PATH.build),
    //   filename: '[name].map'
    // }),
    // new ExtractTextPlugin('styles.css'),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: false,
        // !(ENV === 'prod') ? path.resolve(__dirname, 'assets/cache') : false,
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'resolve-url', 'sass']
    }]
  },
  devServer: {
    contentBase: PATH.client,
    port: 4567
  },
  watchOptions: {
    poll: true
  },
  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['app/client', 'node_modules'],
    extensions: ['', '.js', '.json']
  },
  sassLoader: {
    includePaths: [
      path.join(PATH.client, 'css'),
      path.resolve('node_modules', 'compass-mixins/lib')
    ]
  }
}
