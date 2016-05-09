require('dotenv').config()
const webpack = require('webpack')
// const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./../webpack.config')
const PORT = process.env.PORT

new WebpackDevServer(webpack(config), {
  publicPath: '/public/',
  hot: true,
  historyApiFallback: true
}).listen(PORT, 'localhost', (err, result) => {
  if (err) {
    return console.log(err)
  }
  console.log('Listening at http://localhost:4567/')
})

// const message = `This will be a simple Express server,
// when NODE_ENV is on development: launch the webpackDevServer.
// when NODE_ENV is on production: run the server with the bundle done.`
//
// console.log(message)
// process.exit(0)
