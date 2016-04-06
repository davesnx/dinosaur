const dotenv = require('dotenv')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

dotenv.config()

const DEBUG = process.env.DEBUG
const ENV = process.env.ENV

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
  entry: {
    dino: path.resolve(PATH.client, 'main.js')
  },
  output: {
    path: PATH.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.SourceMapDevToolPlugin({
    //   path: path.resolve(__dirname, PATH.build),
    //   filename: '[name].js.map'
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
    // new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(ENV)
    //   }
    // })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: __dirname,
      loader: 'babel',
      query: {
        cacheDirectory: false,
        // !(ENV === 'prod') ? path.resolve(__dirname, 'assets/cache') : false,
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  },
  devServer: {
    contentBase: PATH.client
  },
  watchOptions: {
    poll: true
  },
  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['app/client', 'node_modules'],
    extensions: ['', '.js', '.json']
  }
}
