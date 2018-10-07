const path = require('path')
const webpack = require('webpack')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = env => {
  return {
    entry: {
      main: ['./src/client.js'],
      // other: ['./vendor'],
    },
    mode: 'production',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    },
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
              loader: MiniCSSExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
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
      // new ExtractTextPlugin('[name].css'),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true, canPrint: true },
        },
      }),
      new MiniCSSExtractPlugin({
        filename: '[name]-[contenthash].css',
      }),
      new HTMLWebpackPlugin({
        template: './src/index.html',
        inject: true,
        title: 'Webpack 4',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV),
        },
      }),
      new MinifyPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip',
      }),
      new BrotliPlugin(),
    ],
  }
}
