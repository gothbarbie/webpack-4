import express from 'express'
import path from 'path'

// Define server
const server = express()

const isProd = process.env.NODE_ENV === 'production'
if (!isProd) {
  // WebpackDevMiddleware
  const webpack = require('webpack')
  const config = require('../../config/webpack.dev.js')
  const compiler = webpack(config)

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  )
  server.use(webpackDevMiddleware)

  // WebpackHotMiddleware
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)
  server.use(webpackHotMiddleware)
}

// StaticMiddleware
const staticMiddleware = express.static('dist')
server.use(staticMiddleware)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
