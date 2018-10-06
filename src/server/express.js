import express from 'express'
import path from 'path'

// Define server
const server = express()

// Setup middlewares

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

// StaticMiddleware
const staticMiddleware = express.static('dist')
server.use(staticMiddleware)

server.listen(8080, () => {
  console.log('Server is listening on port 8080...')
})
