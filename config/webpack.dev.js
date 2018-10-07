const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: [
      'babel-runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/client.js',
    ],
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'dist',
    overlay: true, // display errors in browser
    hot: true, // hot reload
    stats: {
      // print with colors in terminal
      colors: true,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true, // module based css-files
              loadelIdentName: '[name]__[local]--[hash:base64:8]',
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject: true,
      title: 'Webpack 4',
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
  ],
}
