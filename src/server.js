require('dotenv').config()
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = webpack(require('./../webpack.config'))
const { PORT, NODE_ENV } = process.env

if (NODE_ENV === 'production') {
  const message = `This will be a simple Express server,
  when NODE_ENV is on development: launch the webpackDevServer.
  when NODE_ENV is on production: run the server with the bundle done.`

  console.log(message)
  process.exit(0)
}

new WebpackDevServer(config)
  .listen(PORT, 'localhost', (err, result) => {
    if (err) console.log(err)
    console.log(`Listening at http://localhost:${PORT}/`)
  }
)
