require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DEBUG = process.env.DEBUG
const ENV = process.env.ENV
const PORT = process.env.PORT

const PATH = {
  src: path.resolve(__dirname, 'app'),
  client: path.resolve(__dirname, 'app', 'client'),
  build: path.resolve(__dirname, 'dist')
}

module.exports = {
  devtool: 'eval',
  debug: DEBUG,
  process: true,
  inline: true,
  stats: {
    colors: true
  },
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    path.resolve(PATH.client, 'main.js')
  ],
  output: {
    path: PATH.build,
    filename: 'bundle.js',
    publicPath: '/public/'
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
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'resolve-url', 'sass']
    }]
  },
  devServer: {
    contentBase: PATH.client,
    port: PORT,
    hot: true,
    historyApiFallback: true
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
